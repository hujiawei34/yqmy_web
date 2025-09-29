package com.yqmy.service.impl;

import com.yqmy.service.FileService;
import io.minio.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    private final MinioClient minioClient;
    
    @Value("${minio.bucketName}")
    private String bucketName;

    public FileServiceImpl(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        try {
            // 确保存储桶存在
            boolean found = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            if (!found) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            }

            // 生成唯一的文件名
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // 上传文件
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .stream(file.getInputStream(), file.getSize(), -1)
                    .contentType(file.getContentType())
                    .build()
            );

            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("文件上传失败: " + e.getMessage());
        }
    }

    @Override
    public void deleteFile(String fileName) {
        try {
            minioClient.removeObject(
                RemoveObjectArgs.builder()
                    .bucket(bucketName)
                    .object(fileName)
                    .build()
            );
        } catch (Exception e) {
            throw new RuntimeException("文件删除失败: " + e.getMessage());
        }
    }
}
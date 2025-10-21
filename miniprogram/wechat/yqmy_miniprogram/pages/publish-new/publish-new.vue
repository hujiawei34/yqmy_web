<template>
	<view class="publish-new-page">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-left" @tap="closePage">
				<text class="close-icon">×</text>
			</view>
			<view class="nav-center">
				<text class="nav-title">发闲置</text>
			</view>
			<view class="nav-right">
				<button
					:class="['publish-btn', isFormValid ? 'active' : 'disabled']"
					:disabled="!isFormValid"
					@tap="submitProduct"
				>
					发布
				</button>
			</view>
		</view>

		<!-- 主要内容区域 -->
		<scroll-view scroll-y="true" class="content-scroll">
			<!-- 图片上传区域 -->
			<view class="image-upload-section">
				<view v-if="productData.images.length === 0" class="upload-placeholder" @tap="selectImages">
					<text class="upload-icon">+</text>
					<text class="upload-text">添加优质</text>
					<text class="upload-text">首图更吸引人~</text>
				</view>
				<view v-else class="image-grid">
					<view
						v-for="(image, index) in productData.images"
						:key="index"
						class="image-item"
					>
						<image
							:src="image"
							class="product-image"
							mode="aspectFill"
						/>
						<view class="delete-btn" @tap="deleteImage(index)">
							<text class="delete-icon">×</text>
						</view>
					</view>
					<view v-if="productData.images.length < 9" class="add-more-btn" @tap="selectImages">
						<text class="add-icon">+</text>
					</view>
				</view>
			</view>

			<!-- 商品描述区域 -->
			<view class="description-section">
				<textarea
					class="description-input"
					v-model="productData.description"
					placeholder="描述一下宝贝的品牌型号、货品来源..."
					maxlength="1000"
					auto-height
					@input="onDescriptionInput"
				/>

				<!-- AI助手 -->
				<view class="ai-helper" @tap="useAIHelper">
					<view class="ai-icon-wrapper">
						<text class="ai-icon">🤖</text>
					</view>
					<text class="ai-text">AI帮你写</text>
				</view>
			</view>

			<!-- 设置项区域 -->
			<view class="settings-section">
				<!-- 位置设置 -->
				<view class="setting-item" @tap="selectLocation">
					<view class="setting-left">
						<text class="location-icon">📍</text>
						<text class="setting-text">{{ productData.location || '南京 雨花台区' }}</text>
					</view>
					<text class="arrow-icon">></text>
				</view>

				<!-- 价格设置 -->
				<view class="setting-item" @tap="setPrice">
					<view class="setting-left">
						<text class="setting-label">价格</text>
					</view>
					<view class="setting-right">
						<text class="price-text">¥{{ productData.price || '0.00' }}</text>
						<text class="arrow-icon">></text>
					</view>
				</view>

				<!-- 发货方式 -->
				<view class="setting-item" @tap="setShipping">
					<view class="setting-left">
						<text class="setting-label">发货方式</text>
					</view>
					<view class="setting-right">
						<text class="shipping-text">{{ productData.shipping || '包邮' }}</text>
						<text class="arrow-icon">></text>
					</view>
				</view>

				<!-- 同步到圈子 -->
				<view class="setting-item" @tap="setSyncToCircle">
					<view class="setting-left">
						<text class="setting-label">同步宝贝到圈子</text>
						<text class="setting-desc">更多人看到更快卖出</text>
					</view>
					<text class="arrow-icon">></text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			productData: {
				images: [],
				description: '',
				location: '',
				price: '',
				shipping: '',
				syncToCircle: false
			},
			uploadProgress: 0
		}
	},
	computed: {
		isFormValid() {
			return this.productData.images.length > 0 &&
				   this.productData.description.trim() &&
				   this.productData.price;
		}
	},
	onLoad() {
		// 初始化页面
		console.log('发闲置页面加载');
	},
	methods: {
		// 关闭页面
		closePage() {
			uni.navigateBack();
		},

		// 选择图片
		selectImages() {
			const remainingCount = 9 - this.productData.images.length;
			uni.chooseImage({
				count: remainingCount,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.productData.images = this.productData.images.concat(res.tempFilePaths);
				},
				fail: (err) => {
					uni.showToast({
						title: '选择图片失败',
						icon: 'none'
					});
				}
			});
		},

		// 删除图片
		deleteImage(index) {
			this.productData.images.splice(index, 1);
		},

		// 描述输入处理
		onDescriptionInput(e) {
			this.productData.description = e.detail.value;
		},

		// AI助手
		useAIHelper() {
			uni.showToast({
				title: 'AI助手功能开发中',
				icon: 'none'
			});
			// TODO: 实现AI助手功能
		},

		// 选择位置
		selectLocation() {
			uni.chooseLocation({
				success: (res) => {
					this.productData.location = `${res.name} ${res.address}`;
				},
				fail: (err) => {
					uni.showToast({
						title: '获取位置失败',
						icon: 'none'
					});
				}
			});
		},

		// 设置价格
		setPrice() {
			uni.showModal({
				title: '设置价格',
				content: '请输入商品价格',
				editable: true,
				placeholderText: '请输入价格',
				success: (res) => {
					if (res.confirm && res.content) {
						const price = parseFloat(res.content);
						if (!isNaN(price) && price >= 0) {
							this.productData.price = price.toFixed(2);
						} else {
							uni.showToast({
								title: '请输入正确的价格',
								icon: 'none'
							});
						}
					}
				}
			});
		},

		// 设置发货方式
		setShipping() {
			uni.showActionSheet({
				itemList: ['包邮', '不包邮', '自提', '同城配送'],
				success: (res) => {
					const shippingOptions = ['包邮', '不包邮', '自提', '同城配送'];
					this.productData.shipping = shippingOptions[res.tapIndex];
				}
			});
		},

		// 设置同步到圈子
		setSyncToCircle() {
			uni.showToast({
				title: '圈子同步功能开发中',
				icon: 'none'
			});
			// TODO: 实现圈子同步功能
		},

		// 提交商品
		submitProduct() {
			if (!this.isFormValid) {
				uni.showToast({
					title: '请完善商品信息',
					icon: 'none'
				});
				return;
			}

			uni.showLoading({
				title: '发布中...'
			});

			// 构建提交数据
			const submitData = {
				images: this.productData.images,
				description: this.productData.description.trim(),
				location: this.productData.location || '南京 雨花台区',
				price: parseFloat(this.productData.price),
				shipping: this.productData.shipping || '包邮',
				syncToCircle: this.productData.syncToCircle
			};

			// 调用API提交商品
			uni.request({
				url: 'http://localhost:8080/api/products',
				method: 'POST',
				data: submitData,
				success: (res) => {
					uni.hideLoading();
					if (res.data.success) {
						uni.showToast({
							title: '发布成功',
							icon: 'success'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						uni.showToast({
							title: res.data.message || '发布失败',
							icon: 'none'
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					uni.showToast({
						title: '网络错误',
						icon: 'none'
					});
				}
			});
		}
	}
}
</script>

<style>
.publish-new-page {
	min-height: 100vh;
	background-color: var(--background-page);
	display: flex;
	flex-direction: column;
}

/* 顶部导航栏 */
.navbar {
	display: flex;
	align-items: center;
	height: 88rpx;
	padding: 0 30rpx;
	background-color: var(--background-card);
	border-bottom: 1rpx solid var(--border-color);
	position: sticky;
	top: 0;
	z-index: 100;
}

.nav-left,
.nav-right {
	width: 120rpx;
}

.nav-center {
	flex: 1;
	text-align: center;
}

.close-icon {
	font-size: 48rpx;
	color: var(--text-primary);
	font-weight: 300;
	line-height: 1;
}

.nav-title {
	font-size: 34rpx;
	font-weight: 600;
	color: var(--text-primary);
}

.publish-btn {
	padding: 12rpx 32rpx;
	border-radius: 40rpx;
	font-size: 28rpx;
	font-weight: 600;
	border: none;
	line-height: 1.2;
}

.publish-btn.active {
	background: linear-gradient(45deg, #FFD700, #FFC107);
	color: var(--text-primary);
}

.publish-btn.disabled {
	background-color: var(--border-color);
	color: var(--text-muted);
}

/* 主要内容区域 */
.content-scroll {
	flex: 1;
	padding: 0;
	padding-bottom: 60rpx;
}

/* 图片上传区域 */
.image-upload-section {
	padding: 30rpx;
	background-color: var(--background-card);
	border-bottom: 20rpx solid var(--background-page);
}

.upload-placeholder {
	width: 100%;
	height: 400rpx;
	background-color: #F5F5F5;
	border: 2rpx dashed #D1D5DB;
	border-radius: 16rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
}

.upload-icon {
	font-size: 60rpx;
	color: #9CA3AF;
	font-weight: 300;
	line-height: 1;
}

.upload-text {
	font-size: 28rpx;
	color: #9CA3AF;
	line-height: 1.4;
}

.image-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

.image-item {
	width: calc((100% - 40rpx) / 3);
	height: 200rpx;
	position: relative;
	border-radius: 12rpx;
	overflow: hidden;
}

.product-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.delete-btn {
	position: absolute;
	top: 8rpx;
	right: 8rpx;
	width: 48rpx;
	height: 48rpx;
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.delete-icon {
	font-size: 24rpx;
	color: white;
	font-weight: bold;
	line-height: 1;
}

.add-more-btn {
	width: calc((100% - 40rpx) / 3);
	height: 200rpx;
	background-color: #F5F5F5;
	border: 2rpx dashed #D1D5DB;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.add-icon {
	font-size: 48rpx;
	color: #9CA3AF;
	font-weight: 300;
	line-height: 1;
}

/* 商品描述区域 */
.description-section {
	padding: 30rpx;
	background-color: var(--background-card);
	border-bottom: 20rpx solid var(--background-page);
	position: relative;
}

.description-input {
	width: 100%;
	min-height: 300rpx;
	font-size: 32rpx;
	color: var(--text-primary);
	line-height: 1.6;
	background-color: transparent;
	border: none;
	outline: none;
	resize: none;
	word-wrap: break-word;
}

.description-input::placeholder {
	color: #C0C4CC;
	font-size: 32rpx;
}

/* AI助手 */
.ai-helper {
	position: absolute;
	bottom: 30rpx;
	left: 30rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
	padding: 16rpx 24rpx;
	background-color: rgba(139, 92, 246, 0.1);
	border-radius: 40rpx;
	border: 1rpx solid rgba(139, 92, 246, 0.2);
}

.ai-icon-wrapper {
	width: 48rpx;
	height: 48rpx;
	background: linear-gradient(45deg, #8B5CF6, #A855F7);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.ai-icon {
	font-size: 24rpx;
	line-height: 1;
}

.ai-text {
	font-size: 28rpx;
	color: #8B5CF6;
	font-weight: 500;
}

/* 设置项区域 */
.settings-section {
	background-color: var(--background-card);
}

.setting-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 32rpx 30rpx;
	border-bottom: 1rpx solid var(--border-color);
	position: relative;
}

.setting-item:last-child {
	border-bottom: none;
}

.setting-item:active {
	background-color: rgba(245, 158, 11, 0.05);
}

.setting-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex: 1;
}

.location-icon {
	font-size: 32rpx;
	line-height: 1;
}

.setting-label {
	font-size: 32rpx;
	color: var(--text-primary);
	font-weight: 500;
}

.setting-text {
	font-size: 32rpx;
	color: var(--text-primary);
}

.setting-desc {
	font-size: 24rpx;
	color: var(--text-muted);
	margin-left: 8rpx;
}

.setting-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
}

.price-text {
	font-size: 32rpx;
	color: #EF4444;
	font-weight: 600;
}

.shipping-text {
	font-size: 28rpx;
	color: var(--text-secondary);
}

.arrow-icon {
	font-size: 28rpx;
	color: var(--text-muted);
	font-weight: 300;
	line-height: 1;
}

/* 通用按钮样式重置 */
button::after {
	border: none;
}

button {
	background: none;
	border: none;
	padding: 0;
	margin: 0;
	line-height: inherit;
}
</style>
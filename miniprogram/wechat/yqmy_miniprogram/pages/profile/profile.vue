<template>
	<view class="profile-page">
		<view class="header">
			<text class="page-title">我的</text>
		</view>
		<view class="content">
			<text class="placeholder-text">个人中心页面开发中...</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	onLoad() {

	}
}
</script>

<style>
.profile-page {
	min-height: 100vh;
	background-color: var(--background-page);
	padding: 30rpx;
}

.header {
	margin-bottom: 40rpx;
}

.page-title {
	font-size: 36rpx;
	font-weight: 600;
	color: var(--text-primary);
}

.content {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 400rpx;
}

.placeholder-text {
	font-size: 28rpx;
	color: var(--text-muted);
}
</style>
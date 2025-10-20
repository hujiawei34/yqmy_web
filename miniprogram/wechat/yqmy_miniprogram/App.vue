<script>
	export default {
		onLaunch: function() {
			console.log('YQMY App Launch')
		},
		onShow: function() {
			console.log('YQMY App Show')
		},
		onHide: function() {
			console.log('YQMY App Hide')
		}
	}
</script>

<style>
	/* YQMY全局样式 */
	page {
		background-color: #F5F5F5;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	}

	/* 主题色彩变量 */
	:root {
		--primary-color: #F59E0B;
		--primary-dark: #D97706;
		--secondary-color: #3B82F6;
		--text-primary: #1F2937;
		--text-secondary: #6B7280;
		--text-muted: #9CA3AF;
		--border-color: #E5E7EB;
		--background-card: #FFFFFF;
		--background-page: #F5F5F5;
		--success-color: #10B981;
		--warning-color: #F59E0B;
		--danger-color: #EF4444;
	}

	/* 通用样式类 */
	.container {
		padding: 0 30rpx;
	}

	.card {
		background-color: var(--background-card);
		border-radius: 20rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.btn-primary {
		background: linear-gradient(45deg, var(--primary-color), var(--primary-dark));
		color: white;
		border: none;
		border-radius: 25rpx;
		padding: 28rpx 60rpx;
		font-size: 32rpx;
		font-weight: 600;
	}

	.btn-secondary {
		background-color: var(--background-card);
		color: var(--text-primary);
		border: 2rpx solid var(--border-color);
		border-radius: 25rpx;
		padding: 26rpx 58rpx;
		font-size: 32rpx;
	}

	.text-primary {
		color: var(--text-primary);
	}

	.text-secondary {
		color: var(--text-secondary);
	}

	.text-muted {
		color: var(--text-muted);
	}

	.text-orange {
		color: var(--primary-color);
	}

	.bg-orange {
		background-color: var(--primary-color);
	}

	/* 布局助手类 */
	.flex {
		display: flex;
	}

	.flex-column {
		flex-direction: column;
	}

	.flex-center {
		align-items: center;
		justify-content: center;
	}

	.flex-between {
		justify-content: space-between;
	}

	.flex-1 {
		flex: 1;
	}

	/* 间距 */
	.mt-10 { margin-top: 10rpx; }
	.mt-20 { margin-top: 20rpx; }
	.mt-30 { margin-top: 30rpx; }
	.mb-10 { margin-bottom: 10rpx; }
	.mb-20 { margin-bottom: 20rpx; }
	.mb-30 { margin-bottom: 30rpx; }
	.ml-10 { margin-left: 10rpx; }
	.mr-10 { margin-right: 10rpx; }

	/* 字体大小 */
	.font-12 { font-size: 24rpx; }
	.font-14 { font-size: 28rpx; }
	.font-16 { font-size: 32rpx; }
	.font-18 { font-size: 36rpx; }
	.font-20 { font-size: 40rpx; }

	/* 重置默认样式 */
	button::after {
		border: none;
	}
</style>

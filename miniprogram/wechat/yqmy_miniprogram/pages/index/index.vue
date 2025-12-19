<template>
	<view class="homepage">
		<!-- 顶部搜索栏 -->
		<view class="search-bar">
			<view class="search-input-container">
				<input
					class="search-input"
					placeholder="搜索任务关键词/发布者"
					:value="searchValue"
					@input="onSearchInput"
					@confirm="onSearchConfirm"
				/>
				<text class="search-icon">🔍</text>
			</view>
			<view class="filter-btn" @tap="onFilterClick">
				<text class="filter-icon">⚙️</text>
			</view>
			<view class="notification-btn" @tap="onNotificationClick">
				<text class="notification-icon">🔔</text>
				<view v-if="unreadCount > 0" class="notification-badge">
					<text class="badge-text">{{ unreadCount > 99 ? '99+' : unreadCount }}</text>
				</view>
			</view>
		</view>

		<!-- 主要内容区域 -->
		<scroll-view class="main-content" scroll-y="true" @scrolltolower="onReachBottom">
			<!-- Banner轮播区 -->
			<view class="banner-container">
				<swiper
					class="banner-swiper"
					:indicator-dots="true"
					:autoplay="true"
					:interval="5000"
					:duration="300"
					indicator-color="rgba(255,255,255,0.5)"
					indicator-active-color="#F59E0B"
				>
					<swiper-item v-for="(banner, index) in banners" :key="index" @tap="onBannerClick(banner)">
						<view class="banner-item">
							<image class="banner-image" :src="banner.image" mode="aspectFill" />
							<!-- 移除文本叠加层，使用纯图片展示 -->
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 快捷功能网格 -->
			<view class="features-container">
				<view
					v-for="(feature, index) in features"
					:key="index"
					class="feature-item"
					@tap="onFeatureClick(feature, index)"
				>
					<view class="feature-icon-container">
						<text class="feature-icon">{{ feature.icon }}</text>
					</view>
					<text class="feature-title">{{ feature.title }}</text>
					<text class="feature-desc">{{ feature.description }}</text>
				</view>
			</view>

			<!-- 我的积分卡片 -->
			<view class="points-card card">
				<view class="points-header">
					<text class="points-title">我的积分</text>
					<view class="points-refresh" @tap="refreshPoints">
						<text class="refresh-icon">🔄</text>
					</view>
				</view>
				<view class="points-content">
					<view class="points-main">
						<text class="points-number">{{ userPoints }}</text>
						<text class="points-unit">积分</text>
					</view>
					<text class="points-tip">{{ pointsTip }}</text>
				</view>
			</view>

			<!-- 系统公告栏 -->
			<view class="announcement-container">
				<view class="announcement-card card">
					<view class="announcement-header">
						<text class="announcement-title">📢 系统公告</text>
					</view>
					<text class="announcement-content">{{ announcement.content }}</text>
					<view class="announcement-footer">
						<text class="announcement-time">{{ announcement.time }}</text>
						<text class="announcement-more" @tap="viewMoreAnnouncements">查看更多</text>
					</view>
				</view>
			</view>

			<!-- 最新任务列表 -->
			<view class="tasks-container">
				<view class="tasks-card card">
					<view class="tasks-header">
						<text class="tasks-title">🎯 最新任务</text>
						<text class="tasks-more" @tap="viewAllTasks">查看全部</text>
					</view>
					<view class="tasks-list">
						<view
							v-for="(task, index) in latestTasks"
							:key="task.id"
							class="task-item"
							@tap="onTaskClick(task)"
						>
							<view class="task-content">
								<text class="task-title">{{ task.title }}</text>
								<text class="task-desc">{{ task.description }}</text>
								<view class="task-meta">
									<text class="task-publisher">{{ task.publisher }}</text>
									<text class="task-time">{{ task.publishTime }}</text>
								</view>
							</view>
							<view class="task-points">
								<text class="points-amount">{{ task.points }}</text>
								<text class="points-label">积分</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 底部加载更多 -->
			<view class="loading-more" v-if="isLoading">
				<text class="loading-text">加载中...</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchValue: '',
			unreadCount: 3,
			userPoints: 1250,
			pointsTip: '每年12月31日积分将清零，请及时使用',
			isLoading: false,
			banners: [
				{
					id: 1,
					title: '欢迎来到互助社区',
					description: '积分制任务平台，完成任务赚积分',
					image: 'https://yaoqianmeiyong.site/images/yqmy/banners/banner1.png',
					link: '/pages/about/about'
				},
				{
					id: 2,
					title: '发布你的第一个任务',
					description: '使用积分发布任务，让他人帮你完成',
					image: 'https://yaoqianmeiyong.site/images/yqmy/banners/banner2.png',
					link: '/pages/publish/publish'
				},
				{
					id: 3,
					title: '积分规则说明',
					description: '了解如何赚取和使用积分',
					image: 'https://yaoqianmeiyong.site/images/yqmy/banners/banner3.png',
					link: '/pages/rules/rules'
				}
			],
			features: [
				{
					icon: '📝',
					title: '发布任务',
					description: '使用积分发布任务',
					action: 'publish'
				},
				{
					icon: '📋',
					title: '浏览任务',
					description: '查看可接受的任务',
					action: 'browse'
				},
				{
					icon: '💰',
					title: '我的积分',
					description: '查看积分明细',
					action: 'points'
				},
				{
					icon: '📊',
					title: '任务记录',
					description: '查看历史记录',
					action: 'records'
				}
			],
			announcement: {
				content: '积分制度说明：1. 完成任务是赚取积分的唯一途径 2. 积分每年12月31日清零 3. 使用积分发布任务或兑换服务',
				time: '2024-10-20',
				id: 1
			},
			latestTasks: [
				{
					id: 1,
					title: '帮忙代购星巴克咖啡',
					description: '需要购买2杯拿铁，地址在市中心万达广场',
					publisher: '咖啡爱好者',
					publishTime: '刚刚',
					points: 50
				},
				{
					id: 2,
					title: '英语作业辅导',
					description: '小学五年级英语作业辅导，需要1小时',
					publisher: '学生家长',
					publishTime: '5分钟前',
					points: 80
				},
				{
					id: 3,
					title: '帮忙取快递',
					description: '菜鸟驿站取快递，时间灵活',
					publisher: '上班族',
					publishTime: '10分钟前',
					points: 30
				}
			]
		}
	},
	onLoad() {
		this.loadUserData();
		this.loadLatestTasks();
	},
	onShow() {
		this.refreshPoints();
	},
	onPullDownRefresh() {
		this.refreshData();
	},
	onReachBottom() {
		this.loadMoreTasks();
	},
	methods: {
		// 搜索相关
		onSearchInput(e) {
			this.searchValue = e.detail.value;
		},
		onSearchConfirm() {
			if (this.searchValue.trim()) {
				uni.navigateTo({
					url: `/pages/search/search?keyword=${encodeURIComponent(this.searchValue)}`
				});
			}
		},

		// 顶部按钮点击
		onFilterClick() {
			uni.showActionSheet({
				itemList: ['按积分排序', '按时间排序', '按地区筛选'],
				success: (res) => {
					console.log('筛选选项:', res.tapIndex);
				}
			});
		},
		onNotificationClick() {
			uni.navigateTo({
				url: '/pages/notifications/notifications'
			});
		},

		// Banner点击
		onBannerClick(banner) {
			if (banner.link) {
				uni.navigateTo({
					url: banner.link
				});
			}
		},

		// 功能按钮点击
		onFeatureClick(feature, index) {
			switch (feature.action) {
				case 'publish':
					uni.navigateTo({
						url: '/pages/publish/publish'
					});
					break;
				case 'browse':
					uni.switchTab({
						url: '/pages/tasks/tasks'
					});
					break;
				case 'points':
					uni.navigateTo({
						url: '/pages/points/points'
					});
					break;
				case 'records':
					uni.navigateTo({
						url: '/pages/records/records'
					});
					break;
			}
		},

		// 积分相关
		refreshPoints() {
			// 模拟API调用
			setTimeout(() => {
				this.userPoints = Math.floor(Math.random() * 2000) + 500;
			}, 500);
		},

		// 任务相关
		onTaskClick(task) {
			uni.navigateTo({
				url: `/pages/task-detail/task-detail?id=${task.id}`
			});
		},
		viewAllTasks() {
			uni.switchTab({
				url: '/pages/tasks/tasks'
			});
		},

		// 公告相关
		viewMoreAnnouncements() {
			uni.navigateTo({
				url: '/pages/announcements/announcements'
			});
		},

		// 数据加载
		loadUserData() {
			// 模拟加载用户数据
			console.log('加载用户数据');
		},
		loadLatestTasks() {
			// 模拟加载最新任务
			console.log('加载最新任务');
		},
		loadMoreTasks() {
			if (this.isLoading) return;

			this.isLoading = true;
			setTimeout(() => {
				// 模拟加载更多任务
				this.isLoading = false;
			}, 1000);
		},
		refreshData() {
			Promise.all([
				this.loadUserData(),
				this.loadLatestTasks(),
				this.refreshPoints()
			]).finally(() => {
				uni.stopPullDownRefresh();
			});
		}
	}
}
</script>

<style>
.homepage {
	min-height: 100vh;
	background-color: var(--background-page);
}

/* 顶部搜索栏 */
.search-bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	background-color: #ffffff;
	padding: 20rpx 30rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
	display: flex;
	align-items: center;
}

.search-input-container {
	flex: 1;
	position: relative;
	margin-right: 20rpx;
}

.search-input {
	width: 100%;
	height: 80rpx;
	padding: 0 80rpx 0 40rpx;
	background-color: #f5f5f5;
	border-radius: 40rpx;
	font-size: 28rpx;
	color: var(--text-primary);
}

.search-icon {
	position: absolute;
	right: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	font-size: 32rpx;
	color: var(--text-muted);
}

.filter-btn, .notification-btn {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 20rpx;
	background-color: #f5f5f5;
	border-radius: 40rpx;
	position: relative;
}

.filter-icon, .notification-icon {
	font-size: 36rpx;
}

.notification-badge {
	position: absolute;
	top: 10rpx;
	right: 10rpx;
	background-color: var(--danger-color);
	border-radius: 20rpx;
	min-width: 32rpx;
	height: 32rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.badge-text {
	color: white;
	font-size: 20rpx;
	font-weight: bold;
}

/* 主要内容区域 */
.main-content {
	margin-top: 120rpx;
	height: calc(100vh - 120rpx);
	padding-bottom: 20rpx;
}

/* Banner轮播 */
.banner-container {
	margin: 30rpx;
	margin-bottom: 40rpx;
}

.banner-swiper {
	height: 320rpx;
	border-radius: 20rpx;
	overflow: hidden;
}

.banner-item {
	position: relative;
	width: 100%;
	height: 100%;
}

.banner-image {
	width: 100%;
	height: 100%;
}

.banner-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(transparent, rgba(0,0,0,0.7));
	padding: 40rpx 30rpx 30rpx;
}

.banner-title {
	display: block;
	color: white;
	font-size: 36rpx;
	font-weight: 600;
	margin-bottom: 10rpx;
}

.banner-desc {
	display: block;
	color: rgba(255,255,255,0.9);
	font-size: 28rpx;
}

/* 功能网格 */
.features-container {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30rpx;
	margin: 0 30rpx 40rpx;
}

.feature-item {
	background-color: var(--background-card);
	padding: 40rpx;
	border-radius: 24rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	transition: all 0.3s ease;
}

.feature-item:active {
	transform: scale(0.95);
	box-shadow: 0 4rpx 20rpx rgba(245, 158, 11, 0.3);
}

.feature-icon-container {
	margin-bottom: 20rpx;
}

.feature-icon {
	font-size: 80rpx;
}

.feature-title {
	font-size: 32rpx;
	color: var(--text-primary);
	font-weight: 600;
	margin-bottom: 8rpx;
}

.feature-desc {
	font-size: 24rpx;
	color: var(--text-muted);
}

/* 积分卡片 */
.points-card {
	margin: 0 30rpx 40rpx;
	padding: 30rpx;
}

.points-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.points-title {
	font-size: 32rpx;
	font-weight: 600;
	color: var(--text-primary);
}

.points-refresh {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
	border-radius: 50%;
}

.refresh-icon {
	font-size: 32rpx;
}

.points-content {
	text-align: center;
}

.points-main {
	margin-bottom: 10rpx;
}

.points-number {
	font-size: 72rpx;
	font-weight: bold;
	color: var(--primary-color);
}

.points-unit {
	font-size: 32rpx;
	color: var(--text-secondary);
	margin-left: 10rpx;
}

.points-tip {
	font-size: 24rpx;
	color: var(--text-muted);
	line-height: 1.5;
}

/* 公告栏 */
.announcement-container {
	margin: 0 30rpx 40rpx;
}

.announcement-card {
	padding: 30rpx;
}

.announcement-header {
	margin-bottom: 20rpx;
}

.announcement-title {
	font-size: 32rpx;
	font-weight: 600;
	color: var(--text-primary);
}

.announcement-content {
	font-size: 28rpx;
	color: var(--text-secondary);
	line-height: 1.6;
	margin-bottom: 20rpx;
}

.announcement-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.announcement-time {
	font-size: 24rpx;
	color: var(--text-muted);
}

.announcement-more {
	font-size: 26rpx;
	color: var(--primary-color);
}

/* 任务列表 */
.tasks-container {
	margin: 0 30rpx;
}

.tasks-card {
	overflow: hidden;
}

.tasks-header {
	padding: 30rpx;
	border-bottom: 1rpx solid var(--border-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.tasks-title {
	font-size: 32rpx;
	font-weight: 600;
	color: var(--text-primary);
}

.tasks-more {
	font-size: 26rpx;
	color: var(--primary-color);
}

.task-item {
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1rpx solid var(--border-color);
}

.task-item:last-child {
	border-bottom: none;
}

.task-content {
	flex: 1;
}

.task-title {
	font-size: 32rpx;
	color: var(--text-primary);
	font-weight: 500;
	margin-bottom: 8rpx;
	display: block;
}

.task-desc {
	font-size: 26rpx;
	color: var(--text-secondary);
	margin-bottom: 12rpx;
	display: block;
}

.task-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.task-publisher {
	font-size: 24rpx;
	color: var(--text-muted);
}

.task-time {
	font-size: 24rpx;
	color: var(--text-muted);
}

.task-points {
	text-align: center;
	margin-left: 20rpx;
}

.points-amount {
	font-size: 40rpx;
	font-weight: bold;
	color: var(--primary-color);
	display: block;
}

.points-label {
	font-size: 22rpx;
	color: var(--text-muted);
}

/* 加载更多 */
.loading-more {
	padding: 40rpx;
	text-align: center;
}

.loading-text {
	font-size: 28rpx;
	color: var(--text-muted);
}
</style>

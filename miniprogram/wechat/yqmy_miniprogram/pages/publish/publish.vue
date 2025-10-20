<template>
	<view class="publish-page">
		<view class="header">
			<text class="page-title">发布任务</text>
		</view>

		<!-- 发布历史列表 -->
		<view class="publish-history card">
			<view class="history-header">
				<text class="history-title">📝 我的发布</text>
				<text class="history-count">最近{{ Math.min(publishHistory.length, 5) }}条</text>
			</view>

			<view class="history-list">
				<view
					v-for="(task, index) in displayTasks"
					:key="task.id"
					class="task-item"
					@tap="onTaskClick(task)"
				>
					<view class="task-content">
						<view class="task-header">
							<text class="task-title">{{ task.title }}</text>
							<view :class="['task-status', 'status-' + task.status]">
								<text class="status-text">{{ getStatusText(task.status) }}</text>
							</view>
						</view>
						<text class="task-desc">{{ task.description }}</text>
						<view class="task-meta">
							<text class="task-time">{{ task.publishTime }}</text>
							<view class="task-points">
								<text class="points-amount">{{ task.points }}</text>
								<text class="points-label">积分</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 查看更多按钮 -->
			<view v-if="publishHistory.length > 5" class="view-more-btn" @tap="viewMoreHistory">
				<text class="more-text">查看更多</text>
				<image class="dropdown-icon" src="/static/icons/publish/dropdown.png" mode="aspectFit" />
			</view>
		</view>

		<!-- 发布新任务浮动按钮 -->
		<view class="publish-fab" @tap="publishNewTask">
			<image class="fab-icon" src="/static/icons/publish/publishtask.png" mode="aspectFit" />
			<text class="fab-text">发布新任务</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			publishHistory: [
				{
					id: 1,
					title: '帮忙代购星巴克咖啡',
					description: '需要购买2杯拿铁，地址在市中心万达广场，急需！',
					status: 'completed',
					points: 50,
					publishTime: '2024-10-18 14:30'
				},
				{
					id: 2,
					title: '英语作业辅导',
					description: '小学五年级英语作业辅导，需要1小时时间',
					status: 'active',
					points: 80,
					publishTime: '2024-10-19 09:15'
				},
				{
					id: 3,
					title: '帮忙取快递',
					description: '菜鸟驿站取快递，时间灵活，有3个包裹',
					status: 'completed',
					points: 30,
					publishTime: '2024-10-19 16:45'
				},
				{
					id: 4,
					title: 'PPT制作帮助',
					description: '需要制作一个工作汇报PPT，约20页',
					status: 'cancelled',
					points: 120,
					publishTime: '2024-10-20 08:00'
				},
				{
					id: 5,
					title: '宠物看护',
					description: '周末需要有人照看我的小猫，需要上门服务',
					status: 'active',
					points: 100,
					publishTime: '2024-10-20 10:30'
				},
				{
					id: 6,
					title: '搬家帮手',
					description: '需要2个人帮忙搬家，从5楼搬到3楼',
					status: 'completed',
					points: 200,
					publishTime: '2024-10-15 14:20'
				},
				{
					id: 7,
					title: '手机维修咨询',
					description: 'iPhone屏幕碎了，需要推荐靠谱的维修店',
					status: 'active',
					points: 25,
					publishTime: '2024-10-16 11:10'
				}
			]
		}
	},
	computed: {
		// 显示最近的5条任务
		displayTasks() {
			return this.publishHistory.slice(0, 5);
		}
	},
	onLoad() {
		this.loadPublishHistory();
	},
	onShow() {
		// 页面显示时刷新数据
		this.loadPublishHistory();
	},
	onPullDownRefresh() {
		this.refreshData();
	},
	methods: {
		// 获取状态文本
		getStatusText(status) {
			const statusMap = {
				'active': '进行中',
				'completed': '已完成',
				'cancelled': '已取消'
			};
			return statusMap[status] || '未知';
		},

		// 点击任务项
		onTaskClick(task) {
			uni.navigateTo({
				url: `/pages/task-detail/task-detail?id=${task.id}&type=published`
			});
		},

		// 查看更多历史记录
		viewMoreHistory() {
			uni.navigateTo({
				url: '/pages/publish-history/publish-history'
			});
		},

		// 发布新任务
		publishNewTask() {
			uni.navigateTo({
				url: '/pages/publish-new/publish-new'
			});
		},

		// 加载发布历史
		loadPublishHistory() {
			// 这里应该调用API获取用户的发布历史
			// 模拟API调用
			console.log('加载发布历史');
			// TODO: 调用后端API
			// this.publishHistory = response.data;
		},

		// 刷新数据
		refreshData() {
			this.loadPublishHistory();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
}
</script>

<style>
.publish-page {
	min-height: 100vh;
	background-color: var(--background-page);
	padding: 30rpx;
	padding-bottom: 120rpx; /* 为浮动按钮留出空间 */
}

.header {
	margin-bottom: 40rpx;
}

.page-title {
	font-size: 36rpx;
	font-weight: 600;
	color: var(--text-primary);
}

/* 发布历史卡片 */
.publish-history {
	margin-bottom: 30rpx;
}

.history-header {
	padding: 30rpx;
	border-bottom: 1rpx solid var(--border-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.history-title {
	font-size: 32rpx;
	font-weight: 600;
	color: var(--text-primary);
}

.history-count {
	font-size: 26rpx;
	color: var(--text-muted);
}

/* 任务列表 */
.history-list {
	padding: 0;
}

.task-item {
	padding: 30rpx;
	border-bottom: 1rpx solid var(--border-color);
	transition: background-color 0.2s ease;
}

.task-item:last-child {
	border-bottom: none;
}

.task-item:active {
	background-color: rgba(245, 158, 11, 0.05);
}

.task-content {
	width: 100%;
}

.task-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 12rpx;
}

.task-title {
	flex: 1;
	font-size: 32rpx;
	font-weight: 500;
	color: var(--text-primary);
	line-height: 1.4;
	margin-right: 20rpx;
}

.task-status {
	padding: 8rpx 16rpx;
	border-radius: 12rpx;
	font-size: 22rpx;
	white-space: nowrap;
}

.status-active {
	background-color: rgba(16, 185, 129, 0.1);
	color: #10B981;
}

.status-completed {
	background-color: rgba(245, 158, 11, 0.1);
	color: var(--primary-color);
}

.status-cancelled {
	background-color: rgba(239, 68, 68, 0.1);
	color: #EF4444;
}

.status-text {
	font-weight: 500;
}

.task-desc {
	font-size: 28rpx;
	color: var(--text-secondary);
	line-height: 1.5;
	margin-bottom: 16rpx;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.task-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.task-time {
	font-size: 24rpx;
	color: var(--text-muted);
}

.task-points {
	display: flex;
	align-items: baseline;
	gap: 4rpx;
}

.points-amount {
	font-size: 32rpx;
	font-weight: bold;
	color: var(--primary-color);
}

.points-label {
	font-size: 22rpx;
	color: var(--text-muted);
}

/* 查看更多按钮 */
.view-more-btn {
	padding: 25rpx 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10rpx;
	border-top: 1rpx solid var(--border-color);
	background-color: rgba(245, 158, 11, 0.03);
	transition: background-color 0.2s ease;
}

.view-more-btn:active {
	background-color: rgba(245, 158, 11, 0.08);
}

.more-text {
	font-size: 28rpx;
	color: var(--primary-color);
	font-weight: 500;
}

.dropdown-icon {
	width: 24rpx;
	height: 24rpx;
	transition: transform 0.2s ease;
}

/* 发布新任务浮动按钮 */
.publish-fab {
	position: fixed;
	bottom: 40rpx;
	right: 40rpx;
	background: linear-gradient(45deg, var(--primary-color), var(--primary-dark));
	border-radius: 60rpx;
	padding: 24rpx 40rpx;
	box-shadow: 0 8rpx 24rpx rgba(245, 158, 11, 0.4);
	display: flex;
	align-items: center;
	gap: 16rpx;
	z-index: 1000;
	transition: all 0.3s ease;
}

.publish-fab:active {
	transform: scale(0.95);
	box-shadow: 0 4rpx 16rpx rgba(245, 158, 11, 0.6);
}

.fab-icon {
	width: 48rpx;
	height: 48rpx;
}

.fab-text {
	font-size: 30rpx;
	font-weight: 600;
	color: white;
	white-space: nowrap;
}

/* 空状态 */
.empty-state {
	padding: 100rpx 60rpx;
	text-align: center;
}

.empty-icon {
	font-size: 120rpx;
	margin-bottom: 30rpx;
	opacity: 0.3;
}

.empty-text {
	font-size: 32rpx;
	color: var(--text-muted);
	line-height: 1.5;
}
</style>
<template>
	<div>
		<button @click="callBackendFunction">点击执行后端功能</button>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {

		methods: {
			callBackendFunction() {
				axios.get("http://localhost:8080/print") // 后端地址和端口需与实际一致
					.then(response => {
						console.log(response.data);
					})
					.catch(error => {
						console.error('请求失败', error);
					});
			}
		}
	};
</script>
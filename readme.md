自己第一次做小程序
记录一下
实现头部的毛玻璃效果
 filter: blur(5px);   
 显示三个点点点
line-clamp: 3; 行数
   overflow: hidden;
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
   white-space: nowrap;强制不换行*



 	overflow: hidden;
 	text-overflow: ellipsis;
 	display: -webkit-box;
 	-webkit-line-clamp: 3;
 	-webkit-box-orient: vertical;












在苹果上运行定位的元素需要给像素
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			div{
				height: 100px;
				width: 200px;
				border: 1px solid #CCCCCC;
				border-radius: 25%/50%;
			}
		</style>
	</head>
	<body>
		<div>
			
			
		</div>
	</body>
</html>

微信小程序的那个place holder

<input   placeholder-class="psection" maxlength="10" placeholder="最大输入长度10" />


.psection{
    color: #FFC0CB;
}

第二种方式
  <textarea placeholder="placeholder颜色是红色的" placeholder-style="color:red;"  />




  分享
   onShareAppMessage: function () {
    return {
      title: '微信小程序联盟',
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/line_details/line_details'
    }
  }

  "tabBar": {  
   "color": "#a9b7b7",  
   "selectedColor": "#11cd6e",  
   "borderStyle":"white",  
   "list": [{  
     "selectedIconPath": "images/111.png",  
     "iconPath": "images/11.png",  
     "pagePath": "pages/index/index",  
     "text": "首页"  
   }, {  
     "selectedIconPath": "images/221.png",  
     "iconPath": "images/22.png",  
     "pagePath": "pages/logs/logs",  
     "text": "日志"  
   }, {  
     "selectedIconPath": "images/331.png",  
     "iconPath": "images/33.png",  
     "pagePath": "pages/test/test",  
     "text": "开心测试"  
   }]  
 },  
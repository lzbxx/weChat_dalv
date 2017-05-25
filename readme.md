自己第一次做小程序
记录一下
实现头部的毛玻璃效果
 filter: blur(5px);   
 显示三个点点点

   overflow: hidden;
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
   white-space: nowrap;强制不换行*


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

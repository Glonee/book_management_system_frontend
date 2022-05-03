# 图书管理系统前端
# This project is NO LONGER maintained by me. LEAVE ME ALONE.
## 运行
确保已经安装14.0及以上版本的nodejs，然后使用`npm install`安装依赖包，使用`npm start`启动开发服务器。
## 开发
你需要基本的html，css，js和react知识。你可能还需要了解本项目使用的一些库的知识  
1. react-router（路由库，用于管理页面和url）
2. material-ui（简称mui，用于提供好看的组件，如按钮、输入框等）

**你不需要对这些库十分了解**。你只需要了解要使用的组件即可。react-router官网有一个较为完善的[教程](https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/tutorial)。mui的组件十分丰富，你可以在其[官网](https://mui.com/)查阅文档。  
本项目大多数组件采用hook实现，仅个别无法用hook实现的模块（如错误边界）使用class实现。你在编写组件时可以使用你喜欢的方式实现。  
## 例：如何添加页面
1. 在src/pages创建新文件，编写新页面的组件。
2. 修改App.tsx，import该组件、更改菜单栏、并在router中添加新页面。需要更改处已加注释。
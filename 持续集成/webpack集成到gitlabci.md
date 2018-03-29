##### 实现目标
将webpack的打包功能集成到gitlab上的CI里
![image]('./img/gitlabci集成.png')


##### 实现方案
> 将各种插件置于全局，再docker前对文件进行压缩混淆

##### 已实现

+ 1 、测试虚拟机上安装nodejs,yarn,webpack等，能实现基本打包功能，预计该功能可以实现。
+ 2、安装了gitlab，访问10.3.1.107:8081,root,a768426199
+ 3、 安装gitlab Ci, 再注册gitlab runner
+ 4、 已经调通构建命令，但是还没有与docker相结合。
+ 5、已经安装nginx
+ 6、已经扩容虚拟硬盘到30g，已经分区,但是还没有挂载
+  已经能够实现打包功能，使用将源码放到有总共插件文件夹使用webpack后再cp回来。
+  下一如何更好的与docker结合与k8s结合。

##### 遇到的困难
> 如何将node_modules作为全局能够在脚本中执行。以及webpack各种命令与gitlabCI命令的结合。


##### 命令
```
	runner:
	gitlab-runner register  注册runner
		
	gitlab-runner status
	gitlab-runner list      runnner 信息，可以根据现实的途径查看相应文件
	gitlab-runner unregister --url http://192.168.1.2/ci --token 387ed6c05fef248d2183f9f45b9cda      删除runner


	nginx:
	Ubuntu安装之后的文件结构大致为：

	所有的配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下
	程序文件在/usr/sbin/nginx
	日志放在了/var/log/nginx中
	并已经在/etc/init.d/下创建了启动脚本nginx
	默认的虚拟主机的目录设置在了/var/www/nginx-default (有的版本 默认的虚拟主机的目录设置在了/var/www, 请参考/etc/nginx/sites-available里的配置)
 	
 	启动：$sudo /etc/init.d/nginx start
```

##### ubuntu server下gitlabci环境的配置
```
	版本:ubuntu-16.04.2-server-amd64.iso
	1、设置网络
	2、安装vim
	3、a、安装sshd:sudo apt-get install openssh-server
	   b、/etc/init.d/ssh start/status  
	4、安装Nodejs
	   如果源码安装，需要将执行文件进行链接
	        ln -s /home/kun/mysofltware/node-v0.10.28-linux-x64/bin/node /usr/local/bin/node
            ln -s /home/kun/mysofltware/node-v0.10.28-linux-x64/bin/npm /usr/local/bin/npm
	5、如想使用Postfix来发送邮件,在安装期间请选择'Internet Site'. 您也可以用sendmai或者 配置SMTP服务 并 使用SMTP发送邮件.
	   sudo apt-get install curl openssh-server ca-certificates postfix
    6、安装gitlab:
        dpkg -i gitlab的包
        配置gitlab访问:
           sudo vim /etc/gitlab/gitlab.rb
           修改配置
           具体看收藏网页
           修改后运行:sudo gitlab-ctl reconfigure
        配置gitlab runner：
          3）注册runner

            # gitlab-runner register

            Please enter the gitlab-ci coordinator URL:
            # 示例：http://gitlab.alibaba-inc.com/ci
            Please enter the gitlab-ci token for this runner:
            # xxxxxx
            Please enter the gitlab-ci description for this runner:
            # 示例：qd_api_runner
            Please enter the gitlab-ci tags for this runner (comma separated):
            # 示例：hwy
            Whether to run untagged builds [true/false]:
            # true
            Please enter the executor: docker, parallels, shell, kubernetes, docker-ssh, ssh, virtualbox, docker+machine, docker-ssh+machine:
            # docker
            Please enter the default Docker image (e.g. ruby:2.1):
            # maven:3-jdk-8
        
    
    其它:
       1、tar.xz文件的解压
         $xz -d ***.tar.xz
          $tar -xvf  ***.tar
         或者:tar xvJf  node-v6.10.1-linux-x64.tar.xz
```

##### 实现方法

```
   注意事项:
       1、设置共享文件夹，在使用webpack的文件夹及下面文件，设置其他用户组用户可读可写可操作的权限。
```


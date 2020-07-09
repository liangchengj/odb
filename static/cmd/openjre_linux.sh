#!/bin/sh
# Created at 2020/7/9 19:44.
# @author Liangcheng Juves

xz_filename=linux.tar.xz
jdk_from_http=https://odb.liangchengj.com/static/xz/openjre/11.0.7+10/$xz_filename
jdk_install_path=/usr/local/openjre/11.0.7+10/

sudo wget -P /usr/local/ $jdk_from_http
if [ -f "/usr/local/$xz_filename" ];then
	sudo mkdir /usr/local/openjre
	sudo mkdir $jdk_install_path
	sudo tar -xvJf /usr/local/$xz_filename -C $jdk_install_path
	sudo rm -rf /usr/local/$xz_filename
	# Env 
	sudo echo "export JAVA_HOME=\"$jdk_install_path\"
export CLASSPATH=.:\$JAVA_HOME/lib
export PATH=\$JAVA_HOME/bin:\$PATH" >> /etc/profile

	source /etc/profile
	
	sudo echo "
Complete!
"
	java --version
	
	sudo echo "
"
else
	sudo echo "
Download Failed.
"
fi

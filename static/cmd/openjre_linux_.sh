#!/bin/sh
# Created at 2020/7/9 19:44.
# @author Liangcheng Juves

xz_filename=linux.tar.xz
jdk_from_http=https://odb.liangchengj.com/static/xz/openjre/11.0.7+10/$xz_filename
jdk_install_path=/usr/local/openjre/11.0.7+10/

if [ ! -f "/usr/local/$xz_filename" ];then
	wget -P /usr/local/ $jdk_from_http
	mkdir /usr/local/openjre
	mkdir $jdk_install_path
	tar -xvJf /usr/local/$xz_filename -C $jdk_install_path
	rm -rf /usr/local/$xz_filename
	# Env 
	echo "export JAVA_HOME=\"$jdk_install_path\"
export CLASSPATH=.:\$JAVA_HOME/lib
export PATH=\$JAVA_HOME/bin:\$PATH" >> /etc/profile
	source /etc/profile
	echo "
Complete!
"
	java --version
	echo "
"
else 
	echo "
Download Failed.
"
fi

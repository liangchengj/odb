#!/bin/bash

# Created at 2020/5/2 23:46.
# @author Liangcheng Juves

SOURCES_FILE_STRING=/etc/apt/sources.list

sudo cp $SOURCES_FILE_STRING $SOURCES_FILE_STRING.bak
sudo rm -rf $SOURCES_FILE_STRING

read -n2 -p '你的ubuntu版本为？[ A.20.04(focal)   B.18.04(bionic)   C.16.04 ] ' answer
case $answer in
	A | a)
		sudo echo 'deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
		' > $SOURCES_FILE_STRING ;;
	B | b)
		sudo echo 'deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

		deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
		deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
		' > $SOURCES_FILE_STRING ;;
	C | c)
		sudo echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial main
		deb-src http://mirrors.aliyun.com/ubuntu/ xenial main

		deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main
		deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main

		deb http://mirrors.aliyun.com/ubuntu/ xenial universe
		deb-src http://mirrors.aliyun.com/ubuntu/ xenial universe
		deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
		deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates universe

		deb http://mirrors.aliyun.com/ubuntu/ xenial-security main
		deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main
		deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
		deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security universe
		' > $SOURCES_FILE_STRING ;;
esac


sudo apt-get -y upgrade
sudo apt-get -y update

sudo apt -y upgrade
sudo apt -y update


sudo echo '阿里云镜像源配置完成 >>>'



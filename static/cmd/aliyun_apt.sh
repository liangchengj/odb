#!/bin/sh
# Created at 2020/7/10 0:13.
# @author Liangcheng Juves

date=$(date)


sudo cp /etc/apt/sources.list "/etc/apt/sources.list $(date)"
sudo rm -rf /etc/apt/sources.list
sudo echo "deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse" > /etc/apt/sources.list

sudo apt-get -y update
sudo apt-get -y upgrade
sudo apt -y update
sudo apt-get -y upgrade


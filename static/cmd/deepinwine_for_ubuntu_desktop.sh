# !/bin/bash

# Created at 2020/4/29 21:05.
# @author Liangcheng Juves


OUT_DIR=/usr/local/deepinwine


if [ -d "/opt/$OUT_DIR" ];then
	sudo rm -rf /opt/$OUT_DIR
fi
if [ ! -d "$OUT_DIR" ];then
	sudo mkdir $OUT_DIR
fi

echo '开始下载安装deepinwine所需文件 >>>'

ALIYUN_DEEPIN_POOL=https://mirrors.aliyun.com/deepin/pool

sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-wine_2.18-22~rc0_all.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-wine32_2.18-22~rc0_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-wine32-preloader_2.18-22~rc0_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine-helper/deepin-wine-helper_1.2deepin8_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine-plugin/deepin-wine-plugin_1.0deepin2_amd64.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine-plugin-virtual/deepin-wine-plugin-virtual_1.0deepin3_all.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine-uninstaller/deepin-wine-uninstaller_0.1deepin2_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/u/udis86/udis86_1.72-2_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-fonts-wine_2.18-22~rc0_all.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-libwine_2.18-22~rc0_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/main/libj/libjpeg-turbo/libjpeg62-turbo_1.5.2-2%2Bb1_amd64.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/main/libj/libjpeg-turbo/libjpeg62-turbo_1.5.2-2%2Bb1_i386.deb 
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-libwine-dbg_2.18-22~rc0_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-libwine-dev_2.18-22~rc0_i386.deb
sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin-wine/deepin-wine-binfmt_2.18-22~rc0_all.deb

echo '准备添加32位支持 >>>'
sudo dpkg --add-architecture i386

echo '安装deepinwine所需文件安装完成，准备刷新apt缓存信息 >>>'

sudo apt-get update
sudo apt-get -y upgrade

echo '开始安装 >>>'

sudo dpkg -i $OUT_DIR/*.deb

echo '安装完成，正在自动安装依赖 >>>'

sudo apt-get install -y
sudo apt --fix-broken install

echo '安装deepinwine环境完成 >>>'

read -n2 -p '是否安装Deepin-QQ? [Y/n] ' answer
case $answer in
	(Y | y)
		echo '开始下载Deepin-QQ >>>'
		sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin.com.qq.im/deepin.com.qq.im_9.1.8deepin0_i386.deb

		echo '开始安装Deepin-QQ >>>'
		sudo dpkg -i $OUT_DIR/deepin.com.qq.im_9.1.8deepin0_i386.deb
		sudo apt-get install -y
		sudo apt --fix-broken install
		echo '安装Deepin-QQ完成 >>>'
esac


read -n2 -p '是否安装Deepin-WeChat? [Y/n] ' answer
case $answer in
	(Y | y)
		echo '开始下载Deepin-WeChat >>>'
		sudo wget -P $OUT_DIR $ALIYUN_DEEPIN_POOL/non-free/d/deepin.com.wechat/deepin.com.wechat_2.6.8.65deepin0_i386.deb

		echo '开始安装Deepin-WeChat >>>'
		sudo dpkg -i $OUT_DIR/deepin.com.wechat_2.6.8.65deepin0_i386.deb
		sudo apt-get install -y
		sudo apt --fix-broken install
		echo '安装Deepin-WeChat完成 >>>'
esac


echo '开始删除中间文件 >>>'

sudo rm -rf $OUT_DIR

echo '>>> 安装完成   [By Liangcheng Juves]   '

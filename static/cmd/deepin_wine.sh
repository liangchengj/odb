#!/bin/sh

# Created at 2020/7/12 19:16
# @author Liangcheng Juves

install_dir=/usr/local/deepin_wine_tmp

if [ -d $install_dir ];then
	sudo rm -rf $install_dir
fi

sudo mkdir $install_dir

url_begin=https://mirrors.aliyun.com/deepin/pool


install_wine_env_deb=(
        non-free/d/deepin-wine/deepin-wine_2.18-22~rc0_all.deb
        non-free/d/deepin-wine/deepin-wine32_2.18-22~rc0_i386.deb
        non-free/d/deepin-wine/deepin-wine32-preloader_2.18-22~rc0_i386.deb
        non-free/d/deepin-wine-helper/deepin-wine-helper_1.2deepin8_i386.deb
        # non-free/d/deepin-wine-helper64/deepin-wine-helper64_1.1-0_amd64.deb
        non-free/d/deepin-wine-plugin/deepin-wine-plugin_1.0deepin2_amd64.deb
	non-free/d/deepin-wine-plugin/deepin-wine-plugin_1.0deepin2_i386.deb
	non-free/d/deepin-wine-plugin-virtual/deepin-wine-plugin-virtual_1.0deepin3_all.deb
	non-free/d/deepin-wine-uninstaller/deepin-wine-uninstaller_0.1deepin2_i386.deb
	non-free/u/udis86/udis86_1.72-2_i386.deb
	non-free/d/deepin-wine/deepin-fonts-wine_2.18-22~rc0_all.deb
	non-free/d/deepin-wine/deepin-libwine_2.18-22~rc0_i386.deb
	main/libj/libjpeg-turbo/libjpeg62-turbo_1.5.2-2%2Bb1_amd64.deb
	main/libj/libjpeg-turbo/libjpeg62-turbo_1.5.2-2%2Bb1_i386.deb
	non-free/d/deepin-wine/deepin-libwine-dbg_2.18-22~rc0_i386.deb
	non-free/d/deepin-wine/deepin-libwine-dev_2.18-22~rc0_i386.deb
	non-free/d/deepin-wine/deepin-wine-binfmt_2.18-22~rc0_all.deb
)


echo "Begin download ..."
for ele in ${install_wine_env_deb[@]}
do
	sudo wget -P $install_dir $url_begin/$ele
done


sudo dpkg --add-architecture i386


sudo apt -y update

sudo dpkg -i $install_dir/*.deb

sudo apt-get -y install -f

qq_deb_name=deepin.com.qq.im_9.1.8deepin0_i386.deb
sudo wget -P $install_dir $url_begin/non-free/d/deepin.com.qq.im/$qq_deb_name
wx_deb_name=deepin.com.wechat_2.6.8.65deepin0_i386.deb
sudo wget -P $install_dir $url_begin/non-free/d/deepin.com.wechat/$wx_deb_name


read -p "Install QQ? [Y/n] " answer
case $answer in
	[Yy])
		echo "Installing QQ..."
		sudo dpkg -i $install_dir/$qq_deb_name
		sudo apt-get -y install -f
		sudo apt-get -y --fix-missing
		;;
esac


read -p "Install Wechat? [Y/n] " answer
case $answer in
	[Yy])
		echo "Installing WeChat..."
		sudo dpkg -i $install_dir/$wx_deb_name
		sudo apt-get -y install -f
		sudo apt-get -y --fix-missing
		;;
esac


echo "Installed all is OK!"

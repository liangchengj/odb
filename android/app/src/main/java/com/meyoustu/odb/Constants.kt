package com.meyoustu.odb

/**
 * Created by Liangcheng Juves on 28/05/2020 08:15
 */
object Constants {

    init {
        System.loadLibrary("odb")
    }

    @JvmStatic
    lateinit var BASE_URL: String

    external fun initialize()

}
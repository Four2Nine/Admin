<?php

/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/22
 * Time: 12:32
 */
class Constant
{
    static $_SALT = "+Four2Nine+";
    static $_CORRECT = 100; //正确

    static $_USERNAME_ERROR = 201; //用户名错误
    //-------------------------------------------------------
    static $_USERNAME_BLANK_ERROR = 2010; //用户名为空
    static $_USERNAME_LENGTH_ERROR = 2011; //用户名长度不符合要求
    static $_USERNAME_FORMAT_ERROR = 2012; //用户名格式错误
    static $_USERNAME_REPEAT_ERROR = 2013; //用户名重复
    static $_USERNAME_NOT_FOUND_ERROR = 2014; //没有找到该用户

    static $_PASSWORD_ERROR = 202; //密码错误
    //-------------------------------------------------------
    static $_PASSWORD_BLANK_ERROR = 2020; //密码为空
    static $_PASSWORD_LENGTH_ERROR = 2021; //密码长度不符合要求
    static $_PASSWORD_INCONSISTENT_ERROR = 2022; //密码输入不一致
    static $_PASSWORD_INCORRECT_ERROR = 2023; //密码错误

    static $_INVITATION_CODE_ERROR = 203;   //邀请码错误

    //-------------------------------------------------------
    static $_DB_INSERT_ERROR = 301;     //数据库插入错误
    static $_DB_SELECT_ERROR = 302;     //数据库查询错误

    static $_NOT_LOGIN = 400;   //没有登录
    static $_NO_PERMISSION = 401;   //没有权限访问该页面
    static $_TOKEN_INCORRECT = 402; //__token 不符合
}
import { UserInfo } from "../model/UserInfo";

export class AppSingleton {
    private static instance: AppSingleton = new AppSingleton();

    /**当前用户信息 */
    currentUserInfo: UserInfo;

    constructor() {
        if (AppSingleton.instance) {
            throw new Error("错误: 请使用AppGlobal.getInstance() 代替使用new.");
        }
        this.currentUserInfo = new UserInfo();
        AppSingleton.instance = this;
    }

    /**
     * 获取当前实例
     *
     * @static
     * @returns {AppGlobal}
     */
    public static getInstance(): AppSingleton {
        return AppSingleton.instance;
    }
}
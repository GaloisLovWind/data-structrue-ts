# 算法与数据结构 Typescript 版
    通过 Typescript 编写《算法与数据结构》中的一些结构来掌握和熟练 Typescript
## 项目搭建
1. 项目目录搭建
   + `npm init` 创建项目
   + `tsc --init` 创建 typescript 编译设置 生成  tsconfig.json
   + `tslint --init` 检验 typescript 语法和格式
   + 文件主要目录说明
        + dist 编译后生成文件目录
        + src   项目主文件目录
          + app 项目应用文件目录
          + test 项目测试文件目录
            - app.ts 应用主文件
          - main.ts 项目主入口文件
        + typings 全局声明文件目录
2. 项目依赖模块说明
   1. `npm i typescript ts-node nodemon -D` 项目依赖的typescript和编译，运行
   2. `npm i @types/node -D` node的声明文件
3. 执行项目配置说明

    在 `package.json` 中 修改 `scripts` 中的属性
    ```
    "scripts": {
    "start": "npm run serve",
    "serve": "nodemon -e ts --exec ts-node ./src/main.ts",
    "build": "tsc -p ./tsconfig.json"
    }
    ```
## 测试项目搭建
1. 测试依赖模块说明
   1. `npm i mocha chai -D` 单元测试和断言模块依赖
   2. `npm i @types/chai @type/chai -D` 响应的测试模块的声明文件 
   3. API: [Chai](https://www.chaijs.com/api/)
   4. API: [Mocha](https://mochajs.org/)
2. 执行项目配置说明

    在 `package.json` 中 修改 `scripts` 中的属性
    ```
    "scripts": {
        "test": "mocha -r ts-node/register ./src/test/**/*.spec.ts"
    }
    ```       
## 项目启动
1. `npm start` 运行项目
2. `npm run build` 编译生成js文件
3. `npm run test` 测试项目文件

## 项目主要内容

### 数组
1. 数组是数据结构中最简单，也是使用最广泛的一种

### 链表


## 参考链接
1. [GuoLizhi](https://github.com/GuoLizhi/algorithm/tree/master/data-structure)
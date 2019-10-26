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
数组是数据结构中最简单，也是使用最广泛的一种

### 链表

### 散列

散列是一种用于以常数平均时间执行插入、删除和查找的技术；散列表理想结构是一个包含有关键字的具有固定大小 TableSize 的数组，每个关键字被映射到从0到 TableSize - 1 范围的某个数，理想状态是两个不同的关键字映射不同的单元；但数组是有限，关键字无限，所以构造一个单元之间均匀分配关键字的散列函数。因此构造散列需要解决两个问题：
1. 如何构造散列函数，使其映射单元之间均匀分配关键字
    * 将字符串中的字符的 ASCII 码值 累加后，对 TableSize 求余操作；由于ASCCII 码值最大值为127，则如果 TableSize 过大，而关键字的长度短，造成散列表的空间空余过多
    * 假设 关键字的长度至少为2，则通过类似27进制表示法来确定散列函数，如：key[0] + key[1] * 27 + key[2] * 27 * 27
    * 是第二种的拓展; Horner 法则计算； key[0] + key[1] * 32 + key[2] * 32 * 32 + ... + key[key.length - 1] * 32 * ... * 32
2. 当不同的关键字映射相同的单元时，如何解决冲突
    * 分离链接法

    将散列到同一值得所有元素保留到一个表中
    * 开放地址法

    开辟新的单元分配地址存储不同的key值
3. 如何确定散列表的大小，以此达到最佳
## 参考链接
1. [GuoLizhi](https://github.com/GuoLizhi/algorithm/tree/master/data-structure)
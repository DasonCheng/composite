//变量的解构赋值用途
// （1）
{
    console.log("交换变量的值");
    let x = 3,
        y = 6;
    [x, y] = [y, x];
    console.log(x, y);
}

// （2）从函数返回多个值
{
    console.log("从函数返回多个值");
    // 返回一个数组
    function arr() {
        return [1, 2, 3];
    }
    var [a, b, c] = arr();
    console.log(a, b, c);

    // 返回一个对象
    function obj() {
        return {
            foo: 1,
            bar: 2
        };
    }
    var { foo, bar } = obj();
    console.log(foo, bar);
}
// （3）函数参数的定义
{
    console.log("函数参数的定义");
    // 参数是一组有次序的值
    {
        function f([x, y, z]) {
            console.log(x, y, z);
        }
        f([1, 2, 3])
    }

    // 参数是一组无次序的值
    {
        function f({ x, y, z }) {
            console.log(x, y, z);
        }
        f({ z: 3, y: 2, x: 1 })
    }
}
// （4）提取JSON数据
{
    console.log("提取JSON数据");
    var jsonData = {
        id: 42,
        status: "OK",
        data: [867, 5309]
    }

    let { id, status, data: number } = jsonData;

    console.log(id, status, number)
        // 42, "OK", [867, 5309]
}
// （5）函数参数的默认值
{
    console.log("函数参数的默认值");
    jQuery.ajax = function(url, {
        async = true,
        beforeSend = function() {},
        cache = true,
        complete = function() {},
        crossDomain = false,
        global = true,
        // ... more config
    }) {
        // ... do stuff
    };
}
// （6）遍历Map结构
{
    console.log("遍历Map结构");
    var map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
        console.log(key + " is " + value);
    }
    // first is hello
    // second is world
    // 获取键名
    for (let [key] of map) {
        // ...
    }

    // 获取键值
    for (let [, value] of map) {
        // ...
    }
}
//字符的Unicode表示法
{
    console.log("字符的Unicode表示法");
    console.log("\u{20BB7}");
    // "𠮷"

    console.log("\u{41}\u{42}\u{43}");
    // "ABC"
}
//字符串的遍历器接口
{
    console.log("字符串的遍历器接口");
    for (let codePoint of 'foo') {
        console.log(codePoint)
    }
    // "f"
    // "o"
    // "o"
}
// 确定一个字符串是否包含在另一个字符串中
{
    console.log("确定一个字符串是否包含在另一个字符串中");
    var s = 'Hello world!';

    console.log(s.startsWith('Hello')); // true
    console.log(s.endsWith('!')); // true
    console.log(s.includes('o')); // true
    {
        // 这三个方法都支持第二个参数，表示开始搜索的位置。

        var s = 'Hello world!';

        s.startsWith('world', 6) // true
        s.endsWith('Hello', 5) // true
        s.includes('Hello', 6) // false
    }
}
// 原字符串重复n次
{
    /*
      参数如果是小数，会被向下取整。
      负数或者Infinity，会报错
      参数是字符串，则会先转换成数字。
        'na'.repeat('na') // ""
        'na'.repeat('3') // "nanana"
    */

    console.log("原字符串重复n次");
    console.log('x'.repeat(3)); // "xxx"
    console.log('hello'.repeat(2)); // "hellohello"
    console.log('na'.repeat(0)); // ""
}
// 模板字符串
{
    console.log("模板字符串");
    let maxPenalty = "world";
    let template = `
      <h1>Watch out ${maxPenalty}!</h1>
      <h1>Watch out ${maxPenalty}!</h1>
      <h1>Watch out ${maxPenalty}!</h1>
    `;
    console.log(template)
}
// 将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
{
    console.log("将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）");
    // 即必须有length属性
    // Array.from({ length: 3 });
    // [ undefined, undefined, undefinded ]
    let arrayLike = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };

    // ES5的写法
    var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

    // ES6的写法
    let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
    console.log(arr2);

    Array.from('hello')
        // ['h', 'e', 'l', 'l', 'o']

    let namesSet = new Set(['a', 'b'])
    Array.from(namesSet) // ['a', 'b']

    Array.from([1, 2, 3])
        // [1, 2, 3]
}
// Array.of方法用于将一组值，转换为数组
{
    console.log("Array.of方法用于将一组值，转换为数组");
    console.log(Array.of()); // []
    console.log(Array.of(undefined)); // [undefined]
    console.log(Array.of(1)); // [1]);
    console.log(Array.of(1, 2)); // [1, 2]
}
// 数组实例的find()和findIndex()
{
    console.log("数组实例的find()和findIndex()");

    console.log(
        [1, 5, 10, 15].find(function(value, index, arr) {
            return value > 9;
        })
    ); // 10

    console.log(
        [1, 5, 10, 15].findIndex(function(value, index, arr) {
            return value > 9;
        })
    ); // 2

}
// 数组实例的entries()，keys()和values()
{
    console.log("数组实例的entries()，keys()和values()");
    for (let index of['a', 'b'].keys()) {
        console.log(index);
    }
    // 0
    // 1

    for (let elem of['a', 'b']) {
        console.log(elem);
    }
    // 'a'
    // 'b'

    for (let [index, elem] of['a', 'b'].entries()) {
        console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"
}
// 函数参数的默认值
{
    console.log("函数参数的默认值");

    function log(x, y = 'World') {
        console.log(x, y);
    }

    log('Hello') // Hello World
    log('Hello', 'China') // Hello China
    log('Hello', '') // Hello
}
//箭头函数
{
    console.log("箭头函数");
    let a = (x) => {
        console.log(x);
    };
    let b = {
        hello() {
            return "hello";
        }
    }
}

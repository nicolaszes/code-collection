class BatchPromise {

    promiseArr = [];

    errorPromiseArr = [];

    toleranceTimes = 3;

    constructor() {
    }

    apeend = (promise) => {
        this.promiseArr.push(promise);
    }

    run = async () => {
        for (let item of this.promiseArr) {
            await item.then(res => {
                if (res.error) {
                    this.errorPromiseArr.push(item);
                }
                return res;
            })
        }
        if (this.errorPromiseArr.length >= this.toleranceTimes) {
            return Promise.reject('run faild');
        }

        return Promise.all(this.promiseArr);
    }

}

var bat = new BatchPromise();

bat.toleranceTimes = 2;

var promise1 = new Promise((resolve, reject) => {
    reject('error')
})
    .catch(error => { return { error: true }; })

var promise2 = new Promise((resolve, reject) => {
    resolve(1);
})
    .catch(error => { return { error: true }; })

var promise3 = new Promise((resolve, reject) => {
    resolve(2);
})
    .catch(error => { return { error: true }; })

bat.apeend(promise1)
bat.apeend(promise2)
bat.apeend(promise3)

bat.run().then(res=>{
    console.info(res)
})

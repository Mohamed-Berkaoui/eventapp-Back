class FailRes{
    constructor(data,status=400){
        this.statusCode=status
        this.status="FAIL"
        this.data=data
    }
}
module.exports=FailRes
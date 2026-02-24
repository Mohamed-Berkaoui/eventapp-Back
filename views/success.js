class SuccessRes{
    constructor(data,status=200){
        this.statusCode=status
        this.status="SUCCESS"
        this.data=data
    }
}
module.exports=SuccessRes
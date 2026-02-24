class ErrorRes{
    constructor(message,status=500){
        this.statusCode=status
        this.status="ERROR"
        this.message=message
    }
}
module.exports=ErrorRes
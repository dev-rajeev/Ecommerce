class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr= queryStr;
    }


    // search feature create

    search(){
        const keyword= this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,                                     //$regex is mongodb operator
                $options: `i`,                                                      // i means case sensitive
            }
        }:{};
        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryStr}
        // console.log(queryCopy);

        //Removing some field for category------
        const removeFields= ["keyword","page","limit"];

        removeFields.forEach(key=>delete queryCopy[key]);

        // Filter for Price and Rating-----
        //  console.log(queryCopy);                                         //checking purpose

        let queryStr= JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|ite)\b/g,key =>`$${key}`)
        

        this.query= this.query.find(JSON.parse(queryStr));

        // console.log(queryStr);                                          //checking purpose

        return this; 
        
        
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;                  //50 product in ue database and u show in 10 page

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this;
    }
}


module.exports = ApiFeatures
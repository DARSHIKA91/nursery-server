const handlePageNotFound = (req, res)=>{

    res.send(`<div>
     <h1 style="text-align: center;">404 Not Found</h1>
     </div>`)
 }

 export {
    handlePageNotFound
 }
const getHealth = (req, res)=>{
    res.json({
        success: true,
        message: "Server is up and running..."
    })
}

export {
    getHealth
}
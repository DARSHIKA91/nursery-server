import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

const plants = [
    {
      "id": 5,
        "name": "Bamboo",
        "category": "indoor",
        "image": "https://m.media-amazon.com/images/I/51A2rXT6pOL._AC_UF350,350_QL80_.jpg",
        "price": 150,
        "description": "PHORE Two layer lucky bamboo plant with big glass pot and coloured jelly balls (Green) 17to19 sticks"
    },
    {
        "id": 2,
          "name": "Rose",
          "category": "outdoor",
          "image": "https://m.media-amazon.com/images/I/51A2rXT6pOL._AC_UF350,350_QL80_.jpg",
          "price": 200,
          "description": "Rose Plant"
      },
      {
        "id": 8,
          "name": "Mango",
          "category": "indoor",
          "image": "https://m.media-amazon.com/images/I/51A2rXT6pOL._AC_UF350,350_QL80_.jpg",
          "price": 100,
          "description": "Mango Plant"
      }
]

app.post("/plant", (req, res)=>{
    const {name, category, image, price, description} = req.body

    if(!name){
        return res.json({
            success: true,
            data: null,
            message: "Name is required...."
        })
    }
    if(!category){
        return res.json({
            success: true,
            data: null,
            message: "Category is required...."
        })
    }
    if(!image){
        return res.json({
            success: true,
            data: null,
            message: "Image is required...."
        })
    }
    if(!price){
        return res.json({
            success: true,
            data: null,
            message: "Price is required...."
        })
    }
    if(!description){
        return res.json({
            success: true,
            data: null,
            message: "description is required...."
        })
    }

    const randomId = Math.round(Math.random() * 10000)

    const newPlant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description
    }

    plants.push(newPlant)

    res.json({
        success: true,
        data: newPlant,
        message: "New plant added successfully"
    })
})

app.get("/plants", (req, res)=>{
    res.json({
        success: true,
        data: plants,
        message: "All plants fatched successsfully"
    })
})

app.get("/plant/:id", (req, res)=>{
    const {id} = req.params

    const plant = plants.find((p)=>p.id == id)

    res.json({
        success: plant ? true : false,
        data: plant || null,
        message: plant ? "Plant fetched successfully" : "plant not found"
    })
})

app.put("/plant/:id", (req, res)=>{
    const {name, category, image, price, description} = req.body

    const {id} = req.params

    let index = -1

    plants.forEach((plant, i)=> {
        if(plant.id == id){
            index = i
        }
    })

    const newObj = {
        id,
        name,
        category,
        image,
        price,
        description
    }

    if(index == -1){

        res.json({
            success: false,
            message: `Plant not fount for id: ${id}`,
            data: null
        })
    }
    else{
        plants[index]= newObj

        res.json({
            success: true,
            message: `Plant updated successfully`,
            data: newObj
        })
    }

})

app.delete("/plant/:id", (req, res)=>{
    const {id} = req.params
    let index = -1

    plants.forEach((plant, i)=>{
        if(plant.id==id){
            index = i
        }
    })

    if(index==-1){
        return res.json({
            success: true,
            message: `Plant not found with id ${id}`
        })
    }

    plants.splice(index, 1)

    res.json({
        success: true,
        message: "Plant deleted successfully",
        data: null
    })
})



const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
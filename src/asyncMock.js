//este documento no se esta usando ya que se reemplazo por firebase

const productos=[
    {
        id:1,
        nombre:"cables 6mm2 rojo",
        precio:35000,
        categoria:"cable",
        foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgO-A-jWyVa2JUjy2yGNRpef_MZeg509uMRzDIEqV3hw&s",
        stock:100
    },
    {
        id:2,
        nombre:"cables 6mm2 negro",
        precio:35000,
        categoria:"cable",
        foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOYA5qk9HE48OeBu1DTKJXtVYLHHT76IpCog&usqp=CAU",
        stock:100
    },
    {
        id:3,
        nombre:"cables 6mm2 azul",
        precio:35000,
        categoria:"cable",
        foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvpKaXLYwJ_uFwZkZUiiwr4qLQVR58pNqgjw&usqp=CAU",
        stock:100
    },
    {
        id:4,
        nombre:"kid completo de jabalina",
        precio:25000,
        categoria:"puestaTierra",
        foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfPXwW1ms-65Cn56nB0nl2aYk0jb6k9gzYw&usqp=CAU",
        stock:50
    },
    {
        id:5,
        nombre:"termica tetrapolar 25A",
        precio:35000,
        categoria:"proteccionElectrica",
        foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVY7V-bM6G0fNLby4-evPzUaW3I28YlgYyUw&usqp=CAU",
        stock:20
    },
    {
        id:6,
        nombre:"disyuntor monopolar 30mA",
        precio:45000,
        categoria:"proteccionElectrica",
        foto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBbg9GjlflupIogqKVSi-PrObRxOE9Vg4Whw&usqp=CAU",
        stock:30
    }
    ];
    

export const getProductos=()=>{
    return(
        new Promise(
            (resolve)=>{
                setTimeout(()=>{resolve(productos)
                },200)
            }
        )
    )
}

export const getProductoById=(productoId)=>{
    return(
        new Promise(
            (resolve)=>{
                setTimeout(()=>{resolve(productos.find((producto)=>producto.id==productoId))
                },200)
            }
        )
    )
}

export const getProductosCategory=(categoryId)=>{
    return(
        new Promise(
            (resolve)=>{
                setTimeout(()=>{resolve(productos.filter((producto)=>producto.categoria==categoryId))
                },200)
            }
        )
    )
}
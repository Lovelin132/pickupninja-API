var express = require('express');
const router = express.Router();
const firebase = require('firebase-admin');
var firestore = firebase.firestore()



router.post('/add', async (req, res) => {
	 
		firestore.collection("notifications").add(req.body).then(()=>{;
		res.send({ msg: "Data are added successfully",result })
        })
	 .catch (err=> {
		res.send({status:200,msg:"notificatins",error:err})
        })
	
})


router.get('/list',(req, res) => {
 firestore.collection("notifications").get().then(async(docs)=>{

    let data =[];
    docs.forEach(doc=>{
        let obj = doc.data();
        obj['key'] = doc.orderid;
        data.push(obj);
    });
    await Promise.all(data);
    res.send({status:200, msg:" all data",data: data})
})
.catch(err=>{
	res.send({status: 500, msg:"error",error:err})
})
})

module.exports = router;

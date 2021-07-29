const express = require("express");
const router = express.Router();
const functions = require("firebase-admin");
const firestore = functions.firestore();

//feedback add
router.post("/add", async (req, res) => {
    
    firestore.collection("customerfeedback").add(req.body).then(() => {
        res.send({ status: 200,msg:"customer feedbacks", data: req.body })
    })
        .catch(err => {
            res.send({ status: 300, msg: "error", error: err })
        })
})
//get of feedback
router.get("/all", (req, res) => {
    firestore.collection("customerfeedback").get().then(async (docs) => {
        let data = [];
        docs.forEach(doc => {
            let obj = doc.data();
            obj['key'] = doc.orderid;
            data.push(obj);
        })
        await Promise.all(data);
        res.send({ status: 200, msg: "All cstomerfeedbacks are", data: data })
    })
        .catch(err => {
            res.send({ status: 500, msg: "error", error: err })
        })
})
//delete
router.delete("/delete/:id", (req, res) => {
    firestore.collection("customerfeedback").doc(req.params.id).delete(req.body).then((doc) => {
        res.send({ status: 200, msg: "data deleted" })
    })
        .catch(err => {
            res.send({ status: 500, msg: "data error", error: err })
        })
})


module.exports = router;
const express = require("express");
const router = express.Router();
const functions = require("firebase-admin");
const firestore = functions.firestore();

//Add custrmerfeedback
router.post("/feed", async (req, res) => {
    
    firestore.collection("feedback").add(req.body).then(() => {
        res.send({ status: 200,msg:"feedbacks", data: req.body })
    })
        .catch(err => {
            res.send({ status: 300, msg: "data error", error: err })
        })
})
//get of feedback
router.get("/feedbacklist", (req, res) => {
    firestore.collection("feedback").get().then(async (docs) => {
        let data = [];
        docs.forEach(doc => {
            let obj = doc.data();
            obj['key'] = doc.orderid;
            data.push(obj);
        })
        await Promise.all(data);
        res.send({ status: 200, msg: "All feedbacks are", data: data })
    })
        .catch(err => {
            res.send({ status: 500, msg: "data error", error: err })
        })
})
//delete
router.delete("/delete/:id", (req, res) => {
    firestore.collection("feedback").doc(req.params.id).delete(req.body).then((doc) => {
        res.send({ status: 200, msg: "data deleted" })
    })
        .catch(err => {
            res.send({ status: 500, msg: "data error", error: err })
        })
})


module.exports = router;
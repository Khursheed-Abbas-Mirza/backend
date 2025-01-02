const express=require('express')
const service=require('../Db/db')
const router=express.Router();
const databaseName='restaurant_bookings';

try {
    service.setServiceUrl(process.env.URL)
    console.log("Connected to Database")
} catch (error) {
    console.log(error)
}
router.get('/getbookings',async(req,res)=>{
    const docs=await service.postAllDocs({
        db:databaseName,
        includeDocs:true
    })
    console.log(docs)
    res.send(docs.result.rows)
})
router.post('/book',async(req,res)=>{
const { date, time, guests, name, contact } = req.body;

  try {
    const response = await service.postFind({
      db: databaseName,
      selector: { date, time },
    });

    if (response.result.docs.length > 0) {
      return res.status(400).send({msg:"Sorry, this slot is already filled."});
    }
    const booking = { date, time, guests, name, contact };
    const resdocid=await service.postDocument({ db: databaseName, document: booking });

    res.status(201).send({msg:"Booking confirmed.",order_id:resdocid.result.id});
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).send("Error saving booking.");
  }
});
router.post('/check',async(req,res)=>{
    const {date,time}=req.body;
    try {
        const response = await service.postFind({
          db: databaseName,
          selector: { date, time },
        });
    
        // Check if the time slot is already booked
        const isAvailable = response.result.docs.length === 0;
        res.json({ available: isAvailable });
      } catch (err) {
        console.error("Error checking availability:", err);
        res.status(500).send("Error checking availability.");
      }
})
router.delete('/deletebooking',async(req,res)=>{
    const {orderId,name}=req.body;
    try {
        // Fetch the reservation document
        const documents = await service.postFind({
          db: databaseName,
          selector:{name},
        });
        if(documents.result.docs.length===0){
            return res.status(400).send({msg:"No booking found."})
        }
        const reservationDoc = documents.result.docs.find((doc) => doc._id === orderId);
        const respond=await service.deleteDocument({ db: databaseName, docId: reservationDoc._id,rev:reservationDoc._rev});
       
       res.send({success:true,msg:respond.result.id})
      } catch (err) {
        res.send({err:err})
      }
        
})

module.exports=router
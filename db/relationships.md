// auction website

one to one => user : profile

one to many => auction : bids ; city : person.address

one to few => blogPost : comments 

many to many => artists : songs 

auction bids 

sellers 


auctions bids 

sellers

buyers

auction: products

Auction = { // a valid model compiled from AuctionSchema
   products: [{ type: ObjectId, ref: 'Auction' }]

   sales : payments 

-Subdocument (embedded document).
-References 

profileSchema = {}

user = { // 1 to 1 with embedded document
    ....
    profile: profileSchema
    }

    OrderLineSchemas = {}
    order = { // one to few with embedded array of documents 
        lineItems: [OrderLineSchemas]
    }

order.lineItems === [all info about a line item]

    City= {
      
    }
    const ObjectId = mongoose.Schema.Types.ObjectId; 
    Resident = {
        city: { type: ObjectId 
    }

    facebook 

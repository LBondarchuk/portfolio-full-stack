import Event from "../../models/Event.model.js";
export const createEvent = async (req, res) => {
    try {
      const event = await Event.create(req.body);
      const { __v,_id, ...rest } = event.toObject();
      
      res.status(201).json({id:_id, ...rest})
  } catch (error) {
      console.error(error)
      res.status(500).json({message:"Failed to create event"})
  }
};

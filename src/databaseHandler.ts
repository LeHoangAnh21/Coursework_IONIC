import { openDB } from 'idb'
import { Trip } from './models/Trip'

const DATABASE_NAME = "TripDB"

initDB().then(() => {
	console.log("Database connected successfully");
})

export const insertTrip = async (tripInfo: Trip) => {
	const db = await openDB(DATABASE_NAME, 1)
	const key = await db.put("trips", tripInfo)
	console.log("Inserted trip" + key)	
}

export const getAllTrip = async () => {
	const db = await openDB(DATABASE_NAME, 1)
	return await db.getAll("trips")
}

export const getTripById = async (id:number) => {
	const db = await openDB(DATABASE_NAME, 1)
	return await db.get("trips", id)
}

export async function deleteTrip(id:number) {
    const db = await openDB(DATABASE_NAME, 1)
    await db.delete("trips", id)
}

export async function updateThisTrip(trip:Trip) {
    const db = await openDB(DATABASE_NAME, 1)
    var tripDB = await db.get("trips", trip.id!) as Trip
    tripDB.nameOfTrip = trip.nameOfTrip
    tripDB.destination = trip.destination
    tripDB.date = trip.date
    tripDB.risk = trip.risk
    tripDB.vehicle = trip.vehicle
	tripDB.participant = trip.participant
	tripDB.description = trip.description

    await db.put("trips", tripDB);
}

async function initDB() {
	const db = await openDB(DATABASE_NAME, 1, {
		upgrade(db){
			const store = db.createObjectStore('trips', {
				keyPath: 'id',
				autoIncrement: true
			})
		}
	})
}

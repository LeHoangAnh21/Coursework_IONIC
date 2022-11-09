import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar, IonPopover, IonDatetime } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { getTripById, deleteTrip, updateThisTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';
import './Home.css';
import { trash } from 'ionicons/icons'

interface IdParam {
	id: string
}

const Detail: React.FC = () => {

	const [nameOfTrip, setNameOfTrip] = useState('')
	const [destination, setDestination] = useState('')
	const [date, setDate] = useState<string>('')
	const [risk, setRisk] = useState('')
	const [vehicle, setVehicle] = useState('')
	const [participant, setParticipant] = useState('')
	const [description, setDescription] = useState('')
	const [allTrip, setAllTrip] = useState<Trip[]>([])

	const { id } = useParams<IdParam>()
	const history = useHistory()

	const fetchDataFromDB = async () => {
		const trip = await getTripById(Number.parseInt(id)) as Trip
		setNameOfTrip(trip.nameOfTrip)
		setDestination(trip.destination)
		setDate(trip.date)
		setRisk(trip.risk)
		setVehicle(trip.vehicle)
		setParticipant(trip.participant)
		setDescription(trip.description)
	}

	const setDateToInput = (e:any) => {
		const mydate = new Date(e.detail.value)
		setDate(mydate.toLocaleDateString("en-GB"))
	}

	async function handleUpdate(){
		const updateTrip = {
			id: Number.parseInt(id), 
			nameOfTrip:nameOfTrip, 
			destination:destination, 
			date:date,
			risk:risk,
			vehicle:vehicle,
			participant:participant,
			description:description
		}

		await updateThisTrip(updateTrip)
		alert('update done!')
		history.goBack();
	}

	async function handleDelete() {
		await deleteTrip(Number.parseInt(id))
		alert("Deletion done")
		history.goBack();
	}

	useEffect(() => {
		fetchDataFromDB()
	}, [])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="primary">
					<IonButtons slot="start" >
						<IonBackButton />
					</IonButtons>

					<IonButton  onClick={handleDelete} color="danger" slot="end">
						<IonIcon slot="icon-only" icon={trash}></IonIcon>
					</IonButton>

					<IonTitle>Trip Details {id}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>

				<IonItem>
					<IonLabel position="floating">Name of Trip</IonLabel>
					<IonInput value={nameOfTrip} onIonChange={e => setNameOfTrip(e.detail.value!)}></IonInput>
				</IonItem>

				<IonItem>
					<IonLabel position="floating">Destination</IonLabel>
					<IonInput value={destination} onIonChange={e => setDestination(e.detail.value!)}></IonInput>
				</IonItem>

				<IonItem>
					<IonLabel position="floating">Date</IonLabel>
					<IonInput id='mydatepick' value={date}></IonInput>
					<IonPopover keepContentsMounted={true} trigger='mydatepick' triggerAction='click'>
						<IonContent>
						<IonDatetime onIonChange={e => setDateToInput(e)}></IonDatetime>
						</IonContent>
					</IonPopover>
				</IonItem>

				<IonItem>
					<IonLabel position="floating">Requires risk assessment</IonLabel>
					<IonSelect value={risk} onIonChange={e => setRisk(e.detail.value)}>
						<IonSelectOption value="Yes">Yes</IonSelectOption>
						<IonSelectOption value="No">No</IonSelectOption>
					</IonSelect>
				</IonItem>

				<IonItem>
					<IonLabel position="floating">Vehicle</IonLabel>
					<IonInput value={vehicle} onIonChange={e => setVehicle(e.detail.value!)}></IonInput>
				</IonItem>

				<IonItem>
					<IonLabel position="floating">Number of participants</IonLabel>
					<IonInput value={participant} onIonChange={e => setParticipant(e.detail.value!)}></IonInput>
				</IonItem>

				<IonItem>
					<IonLabel position="floating">Description</IonLabel>
					<IonInput value={description} onIonChange={e => setDescription(e.detail.value!)}></IonInput>
				</IonItem>

				<IonButton onClick={handleUpdate} expand="block" color="secondary">Update</IonButton>

			</IonContent>
		</IonPage>
	);
};

export default Detail;

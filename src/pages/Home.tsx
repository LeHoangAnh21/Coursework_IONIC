import { IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonButton, IonList, IonRouterLink } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useState, useEffect } from 'react';
import { Trip } from '../models/Trip';
import './Home.css';
import { insertTrip, getAllTrip } from '../databaseHandler';

const Home: React.FC = () => {

  const [nameOfTrip, setNameOfTrip] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState<string>('')
  const [risk, setRisk] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [participant, setParticipant] = useState('')
  const [description, setDescription] = useState('')
  const [allTrip, setAllTrip] = useState<Trip[]>([])

  const setDateToInput = (e:any) => {
    const mydate = new Date(e.detail.value)
    setDate(mydate.toLocaleDateString("en-GB"))
  }

    const saveHandler = async () => {
    const newTrip : Trip = {
      'nameOfTrip': nameOfTrip, 
      'destination': destination, 
      'date': date,
      'risk': risk,
      'vehicle': vehicle,
      'participant': participant,
      'description': description,
    }

    await insertTrip(newTrip)
    alert('Insert done!')
  }

  const fetchDataFromDB = async () => {
    const allTrip = await getAllTrip()
    setAllTrip(allTrip)
  }

  useEffect(() => {
    fetchDataFromDB()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Travel Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <IonItem>
          <IonLabel position="floating">Name of Trip</IonLabel>
          <IonInput onIonChange={e => setNameOfTrip(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
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
          <IonSelect onIonChange={e => setRisk(e.detail.value)}>
            <IonSelectOption value="Yes">Yes</IonSelectOption>
            <IonSelectOption value="No">No</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Vehicle</IonLabel>
          <IonInput onIonChange={e => setVehicle(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Number of participants</IonLabel>
          <IonInput onIonChange={e => setParticipant(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>

        <IonButton onClick={saveHandler} expand='block' className='ion-margin'>SAVE</IonButton>

        <IonList>
          {allTrip.map(trip => 
            <IonItem key={trip.id}>
              <IonLabel>
                <IonRouterLink routerLink={'/Detail/' + trip.id}>
                  <IonLabel>{trip.nameOfTrip}</IonLabel>
                  <IonLabel>{trip.date}</IonLabel>
                </IonRouterLink>
              </IonLabel>
            </IonItem>
          )}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;

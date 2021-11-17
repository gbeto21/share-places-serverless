import React from 'react'

import './PlaceList.css'
import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'
import Button from '../../shared/components/FormElements/Button'

const PlaceList = props => {

    console.log(props.items);
    if (props.items.length === 0) {
        return (<div className="place-list center">
            <Card>
                <h2>No places found. Maybe create one?</h2>
                <Button to='/places/new'>Share Place</Button>
            </Card>
        </div>)
    }

    return <ul className="place-list">
        {props.items.map(place => (
            <PlaceItem
                key={place.placeId}
                id={place.placeId}
                imageUrl={place.imageUrl}
                name={place.name}
                description={place.description}
                onDelete={props.onDeletePlace}
            />
        ))}
    </ul>
}

export default PlaceList
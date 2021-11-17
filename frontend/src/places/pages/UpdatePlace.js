import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getPlace,
  updatePlace
} from "../../api/places";
import { useAuth0 } from "@auth0/auth0-react";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdatePlace = () => {

  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setLoadedPlace] = useState()
  const placeId = useParams().placeId;
  const navigate = useNavigate();
  const { getIdTokenClaims, isAuthenticated } = useAuth0()
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (isAuthenticated) {
          const token = await (await getIdTokenClaims()).__raw
          const place = await getPlace(token, placeId)
          setLoadedPlace(place)
          setFormData(
            {
              name: {
                value: place.name,
                isValid: true
              },
              description: {
                value: place.description,
                isValid: true
              }
            },
            true
          );
        }
      } catch (error) {
        console.error("Error geting place: ", error);
      }
    }
    fetchPlace()
  }, [placeId])

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    console.log("Updating the place.");
    try {
      const token = await (await getIdTokenClaims()).__raw
      const placeToUpdate = {
        ...loadedPlace,
        name: formState.inputs.name.value,
        description: formState.inputs.description.value
      }
      console.log("New data: ", placeToUpdate);
      await updatePlace(token, placeToUpdate)
      console.log("Place updated correctly.");
      navigate('/')
    }
    catch (error) {
      console.error("Error updating the place: ", error);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      {!isAuthenticated &&
        <h3>Please login for update places.</h3>
      }
      {
        isAuthenticated &&
        (<React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {!isLoading &&
            loadedPlace &&
            <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
              <Input
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={loadedPlace.name}
                initialValid={true}
              />
              <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="Please enter a valid description (min. 8 characters)."
                onInput={inputHandler}
                initialValue={loadedPlace.description}
                initialValid={true}
              />
              <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
              </Button>
            </form>}
        </React.Fragment>)}
    </React.Fragment>
  );
};

export default UpdatePlace;

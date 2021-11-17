import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createPlace,
  getSignedUrl,
  uploadFile
} from "../../api/places";
import { useAuth0 } from "@auth0/auth0-react";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'
import './PlaceForm.css';
import { useHttpClient } from "../../shared/hooks/http-hook";

const NewPlace = () => {

  const { isLoading, error, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    image: {
      value: null,
      isValid: false
    }
  }, false)

  const { getIdTokenClaims } = useAuth0()
  const navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault()
    console.log("Creating place");
    try {
      const formData = new FormData()
      formData.append('name', formState.inputs.name.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('image', formState.inputs.image.value)
      const name = formData.get("name")
      const description = formData.get("description")
      const file = formData.get("image")
      const newPlace =
      {
        name,
        description
      }

      const token = await (await getIdTokenClaims()).__raw
      const placeCreated = await createPlace(token, newPlace)
      const signedUrl = await getSignedUrl(token, placeCreated.placeId)
      await uploadFile(signedUrl, file)
      console.log("File uploaded correctly.");

      navigate('/')
    } catch (error) { console.log("Error creating place: ", error); }
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid description (at least 8 characters)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;

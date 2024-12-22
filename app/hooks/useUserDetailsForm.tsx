import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUser } from "../services/userService";
import { UserDetails } from "../types/types";
import * as Yup from "yup";

// form input schema
// used to validate the inputs provided
const userDetailsInputValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  dp: Yup.mixed(),
  about: Yup.string(),
});

const useUserDetailsForm = (defaultValues: UserDetails) => {
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(userDetailsInputValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    let isMounted = true;

    getUser(defaultValues.uid).then((user) => {
      if (isMounted && user) {
        reset(user);
      }
    });

    // clean up mechanism to handle case such that if this screen is unmounted before getUser resolves then we dont want to update the value
    return () => {
      isMounted = false;
    };
  }, [defaultValues.uid, reset]);

  return { control, handleSubmit, formState, reset };
};

export default useUserDetailsForm;

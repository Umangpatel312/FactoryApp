// import { useState } from 'react';
// import classNames from 'classnames';
// import { Alert, AlertVariant, ButtonVariant, PropsWithClassName, PropsWithTestId } from '@leanstacks/react-common';
// import { Form, Formik } from 'formik';
// import { object, string, number, boolean } from 'yup';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button } from '@leanstacks/react-common';
// import TextField from 'common/components/Form/TextField';
// import FAIcon from 'common/components/Icon/FAIcon';
// import { Machine, useGetMachine } from 'common/api/useGetMachine';
// import LoaderSkeleton from 'common/components/Loader/LoaderSkeleton';
// import CheckBoxField from 'common/components/Form/CheckBoxField';
// import { useUpdateMachine } from '../api/useUpdateMachines';

// /**
//  * Properties for the `SigninForm` component.
//  * @see {@link PropsWithClassName}
//  * @see {@link PropsWithTestId}
//  */
// interface MachineFormProps extends PropsWithClassName, PropsWithTestId { }


// /**
//  * Signin form validation schema.
//  */
// const validationSchema = object<Machine>({
//   name: string().required('Required.'),
//   area: number().required('Required.'),
//   heads: number().required('Required.'),
//   isActive: boolean().required('Required.'),
// });

// /**
//  * The `SigninForm` component renders a form for user authentication.
//  *
//  * Upon successful authentication, navigates the user to the authenticated
//  * landing page of the application.
//  *
//  * Upon error, displays messages.
//  *
//  * @param {MachineFormProps} props - Component properties.
//  * @returns {JSX.Element} JSX
//  */
// const MachineForm = ({ className, testId = 'form-signin' }: MachineFormProps): JSX.Element => {
//   const { machineId } = useParams();
//   const [error, setError] = useState<string>('');

//   let machine: Machine | undefined, isPending: boolean | undefined;
//   console.log("machineId", machineId);
//   if (!!machineId) {
//     const { data, isPending: apiIsPending, error: apiErrorMsg } = useGetMachine({ machineId: Number(machineId) });
//     machine = data;
//     isPending = apiIsPending;
//     if (!!apiErrorMsg) {
//       setError(apiErrorMsg.message);
//     }

//   }
//   console.log(machine, isPending);

//   const { mutate: createMachine } = useCreateMachine();
//   const { mutate: updateMachine } = useUpdateMachine(); // Use the updateMachine hook

//   const navigate = useNavigate();

//   const handleSubmit = (values: Machine, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
//     setError('');
//     const mutationFn = machineId ? updateMachine : createMachine;
//     mutationFn({ machine: values }, {
//       onSuccess: () => {
//         setSubmitting(false);
//         navigate(-1);
//       },
//       onError: (err: Error) => {
//         setError(err.message);
//         setSubmitting(false);
//       },
//     });
//   };

//   return (
//     <div className={classNames('lg:w-2/3 xl:w-1/2 border p-4 rounded-md shadow-md', className)} data-testid={testId}>
//       {error && (
//         <Alert
//           variant={AlertVariant.Error}
//           className="mb-4 flex items-center gap-2 rounded-none"
//           testId={`${testId}-alert`}
//         >
//           <FAIcon icon="circleExclamation" size="lg" />
//           {error}
//         </Alert>
//       )}
//       {isPending ? (
//         <>
//           <LoaderSkeleton className="my-3 h-6 w-16" />
//           <LoaderSkeleton className="my-3 h-4 w-80" />
//           <LoaderSkeleton className="my-3 h-4 w-80" />
//           <LoaderSkeleton className="my-3 h-4 w-80" />
//           <LoaderSkeleton className="my-3 h-4 w-80" />
//           <LoaderSkeleton className="my-3 h-4 w-80" />
//         </>
//       ) :
//         (
//           <Formik<Machine>
//             initialValues={machine ? machine : { id: 0, name: '', heads: undefined, area: undefined, isActive: true }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ dirty, isSubmitting }) => (
//               <Form data-testid={`${testId}-form`}>
//                 <TextField
//                   name="name"
//                   label="Name"
//                   className="mb-4"
//                   autoComplete="off"
//                   maxLength={30}
//                   disabled={isSubmitting}
//                   testId={`${testId}-text-field-username`}
//                 />
//                 <TextField
//                   type='number'
//                   name="heads"
//                   label="Heads"
//                   className="mb-4"
//                   autoComplete="off"
//                   maxLength={30}
//                   disabled={isSubmitting}
//                   testId={`${testId}-text-field-password`}
//                 />
//                 <TextField
//                   type='number'
//                   name="area"
//                   label="Area"
//                   className="mb-4"
//                   autoComplete="off"
//                   maxLength={30}
//                   disabled={isSubmitting}
//                   testId={`${testId}-text-field-password`}
//                 />
//                 <CheckBoxField
//                   type='checkbox'
//                   name="isActive"
//                   label="Active"
//                   className="mb-4"
//                   disabled={true}
//                   testId={`${testId}-text-field-isActive`}
//                 />
//                 <Button
//                   type="submit"
//                   variant={ButtonVariant.Text}
//                   className="w-full sm:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 lg:mr-2 mb-2"
//                   disabled={isSubmitting || !dirty}
//                   testId={`${testId}-button-submit`}
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   type="button"
//                   onClick={() => navigate(-1)}
//                   className="w-full sm:w-40"
//                   // disabled={isSubmitting || !dirty}
//                   testId={`${testId}-button-submit`}
//                 >
//                   Cancel
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         )
//       }


//     </div>
//   );
// };

// export default MachineForm;

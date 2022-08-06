import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RefreshIcon from '@mui/icons-material/RefreshOutlined';
import { Navigate } from 'react-router-dom';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const steps = [
  {
    label: 'Request for Title Transfer from Seller to Buyer',
    description: `Seller initiates the Title transfer and requests respective government department`,
  },
  {
    label: 'Title Transfer Confirmation by Buyer',
    description:
      'Buyer will acknowledge and approve to be part of the Title transfer',
  },
  {
    label: 'Title Transfer Initiated',
    description: `Both Buyer an Seller have approved to share necessary documents required to perform the Title Transfer`,
  },
  {
    label: 'Government Official Assigned',
    description: `Government official assigned to the Title Transfer transaction`,
  },
  {
    label: 'Document Verification',
    description:
      'Government official verifies documents related to the Title and KYC of the buyer and seller',
  },
  {
    label: 'Market value evaluation',
    description: `Government Official calculates stamp duty and registration fee amount based on market value of the property`,
  },
  {
    label: 'Payment completed',
    description: `Buyer submits proof of stamp duty and registration fee.`,
  },
  {
    label: 'Payment verification',
    description:
      'Government Official checks for payment and if all OK schedules the Registration/Date for Title Transfer',
  },
  {
    label: 'Title transfer execution',
    description: `Government official performs Title transfer`,
  },
  {
    label: 'Title Transferred',
    description: `Government official releases necessary documents to Buyer.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [goStepActive, goBack] = React.useState(false);
  const { propertyName } = useParams();
  const [loadingInProgress, setLoadingInProgress] = React.useState(true);
  const [propertyDetails, setPropertyDetails] = React.useState("");

  React.useEffect(() => {
    refreshStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const refreshStatus = () => {
    setLoadingInProgress(true);

    axios({
      url: `http://localhost:8060/property/get?propertyName=${propertyName}`,
      method:"GET",
      headers: {
        'Content-Type': "application/json"
      },
    }).then((res) => {
      console.log(res);
      setPropertyDetails(res);
      setLoadingInProgress(false)
      setActiveStep(res.data.activeStep);
      console.log(propertyDetails);
    }).catch((e) => {
      console.log(e);
      setLoadingInProgress(false)
    })
  }

  const handleNext = (currentStep) => {
    if(currentStep === 9) {
          /* Below is the proof signed by the government officier or buyer based on the active step */
          /* this proof also contains meta info like status, links to previous hashes */
         const thisStepIxProof = "current_Step_Proof_Signed_By_Authorized_Buyer_Or_Govt_Official"

          axios({
            url: `http://localhost:8060/property/updatestatus`,
            method:"PUT",
            headers: {
              'Content-Type': "application/json"
            },
            data: {
              "propertyName": propertyName,
              "updatedStatus": currentStep,
              "provHash": thisStepIxProof
            }
          }).then((res) => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }).catch((e) => {
            console.log(e);
          })
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="row">
      {goStepActive && <Navigate to="/myProperties/property1" /> }
   
      <Box className="col-md-5 offset-md-4">
        <div style={{ display:'flex', justifyContent:'space-between'}}>
          <h5 style={{ color: '#1876d1', cursor:'pointer'}} onClick={ () => goBack(true)}>
            <ChevronLeftIcon /> { ' Go to Property' }
          </h5>
          <Button
              variant="contained"
              onClick={refreshStatus}
              style={{ fontSize: '11px', padding:'0px 20px', marginTop:'-4px',boxShadow:'none', backgroundColor:'#074817', color:'#fff' }}
              sx={{ mt: 1, mr: 1 }}
          >
            Refresh <RefreshIcon />
          </Button>
        </div>
        {loadingInProgress ? 
        <>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        </> : 
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext(index)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      }
      </Box>
    </div>
  );
}

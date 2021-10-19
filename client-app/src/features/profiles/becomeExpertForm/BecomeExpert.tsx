import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, GridColumn, Step, Transition } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CertificationForm from "./CertificationSegment";
import EducationForm from "./EducationSegment";
import EmploymentForm from "./EmploymentSegment";
import ExperienceForm from "./ExperienceSegment";
import PortfolioForm from "./PortfolioSegment";
import SkillsForm from "./SkillsSegment";

export default observer(function BecomeExpert() {
  const {
    profileStore,
    userStore: { user },
  } = useStore();

  const { becomeExpert, profile, loadProfile } = profileStore;

  const forms = [
    <SkillsForm />,
    <PortfolioForm />,
    <EmploymentForm />,
    <ExperienceForm />,
    <EducationForm />,
    <CertificationForm />,
  ];

  const [formRow, setFormRow] = useState(forms.slice(0, 1));
  const [activeStep, setActiveStep] = useState(1);
  const [buttonState, setButtonState] = useState(false);

  const skillsArrayLength = profile?.skills.length;

  function handleNext() {
    setFormRow((prev) => {
      return forms.slice(0, prev.length + 1);
    });
    setActiveStep(formRow.length + 1);
  }

  useEffect(() => {
    if (user) loadProfile(user.username);
  }, [user, loadProfile]);

  useEffect(() => {
    if (profile) {
      switch (activeStep) {
        case 1:
          setButtonState(false);
          setButtonState(profile.skills.length > 0);
          break;
        case 2:
          setButtonState(false);
      }
    }
  }, [activeStep, profile, skillsArrayLength]);

  return (
    <Grid>
      <Grid.Column width="2">
        <Step.Group vertical>
          <Step active={activeStep === 1}>
            <Step.Content>Skills</Step.Content>
          </Step>
          <Step active={activeStep === 2}>
            <Step.Content>Portfolio</Step.Content>
          </Step>
          <Step active={activeStep === 3}>
            <Step.Content>Employment</Step.Content>
          </Step>
          <Step active={activeStep === 4}>
            <Step.Content>Experience</Step.Content>
          </Step>
          <Step active={activeStep === 5}>
            <Step.Content>Education</Step.Content>
          </Step>
          <Step active={activeStep === 6}>
            <Step.Content>Certification</Step.Content>
          </Step>
        </Step.Group>
      </Grid.Column>
      <GridColumn width="1" />
      <Grid.Column width="10">
        <Transition.Group
          as={Grid}
          duration={1000}
          divided
          size="huge"
          verticalAlign="middle"
        >
          {formRow.map((item, index) => (
            <Grid.Row key={index}>{item}</Grid.Row>
          ))}
        </Transition.Group>
        <Button.Group floated="right">
          <Button
            onClick={handleNext}
            style={{ marginTop: "50px" }}
            content="Next Step"
            size="large"
            disabled={!buttonState}
          />
        </Button.Group>
      </Grid.Column>
    </Grid>
  );
});

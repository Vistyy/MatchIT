import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Grid, GridColumn, Step, Transition } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CertificationSegment from "./segments/CertificationSegment";
import EducationSegment from "./segments/EducationSegment";
import EmploymentSegment from "./segments/EmploymentSegment";
import ExperienceSegment from "./segments/ExperienceSegment";
import PortfolioSegment from "./segments/PortfolioSegment";
import SkillsSegment from "./segments/SkillsSegment";

export default observer(function BecomeExpert() {
  const {
    profileStore,
    userStore: { user },
  } = useStore();

  const { profile, loadProfile } = profileStore;

  const forms = [
    <SkillsSegment />,
    <PortfolioSegment />,
    <EmploymentSegment />,
    <ExperienceSegment />,
    <EducationSegment />,
    <CertificationSegment />,
  ];

  const [formRow, setFormRow] = useState(forms.slice(0, 1));
  const [activeStep, setActiveStep] = useState(1);
  const [buttonState, setButtonState] = useState(false);

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
    setButtonState(false);
    if (profile) {
      switch (activeStep) {
        case 1:
          // setButtonState(profile.skills.length > 0);
          setButtonState(true);
          break;
        case 2:
          // setButtonState(profile.portfolio.length > 0);
          setButtonState(true);
          break;
        case 3:
          // setButtonState(profile.employment.length > 0);
          setButtonState(true);
          break;
        case 4:
          // setButtonState(profile.experience.length > 0);
          setButtonState(true);
          break;
        case 5:
          // setButtonState(profile.education.length > 0);
          setButtonState(true);
          break;
        case 6:
          // setButtonState(profile.certifications.length > 0);
          setButtonState(true);
          break;
      }
    }
  }, [activeStep, profile, profile?.skills.length, profile?.portfolio.length, profile?.employment.length, profile?.experience.length, profile?.education.length, profile?.certifications.length]);

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

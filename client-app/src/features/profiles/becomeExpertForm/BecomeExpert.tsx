import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, GridColumn, Step, Transition } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
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

  const {
    profile,
    loadProfile,
    becomeExpert,
    skillCount,
    loading,
    uploading,
    loadingProfile,
  } = profileStore;

  const skillsRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const employmentRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certificationRef = useRef<HTMLDivElement>(null);

  const refs = [
    skillsRef,
    portfolioRef,
    employmentRef,
    experienceRef,
    educationRef,
    certificationRef,
  ];
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
    setTimeout(() => {
      refs[activeStep].current!.scrollIntoView({ behavior: "smooth" });
    }, 10);
  }

  function handleSaveChanges() {
    becomeExpert(profile!);
  }

  useEffect(() => {
    if (user) loadProfile(user.username);
  }, [user, loadProfile]);

  useEffect(() => {
    setButtonState(false);
    if (profile) {
      switch (activeStep) {
        case 1:
          setButtonState(profile.skills.length > 0);
          // setButtonState(true);
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

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;
  return (
    <Grid>
      <Grid.Column width="2">
        <Step.Group vertical style={{ position: "fixed" }}>
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
          divided
          size="huge"
          verticalAlign="middle"
          style={{ marginBottom: "2em" }}
        >
          {formRow.map((item, index) => (
            <Grid.Row key={index}>
              <div ref={refs[index]}>{item}</div>
            </Grid.Row>
          ))}
        </Transition.Group>
        <Button.Group style={{ float: "right" }}>
          {forms.length > activeStep ? (
            <Button
              onClick={handleNext}
              className="becomeExpert-progressButton"
              content="Next Step"
              size="large"
              disabled={!buttonState}
            />
          ) : (
            <div
              className="becomeExpert-progressButton"
              onClick={() => {
                if (skillCount === 0)
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Button
                content="Save Changes"
                className="positive--custom"
                size="large"
                onClick={handleSaveChanges}
                disabled={skillCount === 0}
                loading={loading || uploading}
              />
            </div>
          )}
        </Button.Group>
      </Grid.Column>
    </Grid>
  );
});

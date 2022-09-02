import type { FunctionComponent, FormEvent } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
  Form,
  FormAlert,
  FormGroup,
  TextInput,
  Flex,
  FlexItem,
  Divider,
  FormProps,
} from "@patternfly/react-core";
import OutlinedClockIcon from "@patternfly/react-icons/dist/js/icons/outlined-clock-icon";
import { InstanceInfo } from "./components/InstanceInfo";
import {useCreateServiceRegistry} from "./machines";

import "./CreateServiceRegistryInstance.css";

export type CreateServiceRegistryInstanceProps = {
  /**
   *
   * Flag to show the modal
   */
  isModalOpen: boolean;

  /**
   * Set this to `true` on Storybook when there are multiple modals open at a time.
   */
  disableFocusTrap?: boolean;
  /**
   * The parent container to append the modal to. Defaults to document.body
   */
  trialDurationInHours: number;
  appendTo?: () => HTMLElement;

  /**
   * A callback for when the cancel or close button are clicked.
   */
  onCancel: () => void;
  onClickQuickStart: () => void;
};

export const CreateServiceRegistryInstance: FunctionComponent<
  CreateServiceRegistryInstanceProps
> = ({
  isModalOpen,
  disableFocusTrap,
  appendTo,
  trialDurationInHours,
  onCancel,
  onClickQuickStart,
}) => {
  const { t } = useTranslation("create-service-registry-instance");
  const FORM_ID = "create_service_registry_instance_form";
  const {isLoading, isSaving,}=useCreateServiceRegistry();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onCreate();
    },
    [onCreate]
  );

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.large}
      title={t("create_instance_title")}
      disableFocusTrap={disableFocusTrap}
      isOpen={isModalOpen}
      ouiaId="modal-create-kafka"
      onClose={onCancel}
      appendTo={appendTo}
      position="top"
      footer={
        <Stack hasGutter={true}>
          <StackItem>
            <Alert
              className="mas--CreateKafkaInstance__creationTimeAlert"
              customIcon={<OutlinedClockIcon />}
              variant="info"
              isInline
              isPlain
              title={t("instance_creation_time_alert")}
            />
          </StackItem>
          <StackItem>
            <Button
              key="submit"
              variant="primary"
              type="submit"
              form={FORM_ID}
              spinnerAriaValueText={t("common:submitting_request")}
              isDisabled={isLoading || isSaving}
              isLoading={isSaving}
              data-testid="modalCreateServiceRegistry-buttonSubmit"
              ouiaId="button-create"
            >
              {t("create_instance")}
            </Button>
            <Button
              key="cancel"
              variant="link"
              onClick={onCancel}
              data-testid="modalCreateServiceRegistry-buttonCancel"
            >
              {t("common:cancel")}
            </Button>
          </StackItem>
        </Stack>
      }
    >
      <Flex direction={{ default: "column", lg: "row" }}>
        <FlexItem flex={{ default: "flex_2" }}>
          {" "}
          <Form onSubmit={onSubmit} id={FORM_ID}>
            {!isFormValid && (
              <FormAlert>
                <Alert
                  variant="danger"
                  title={t("common:form_invalid_alert")}
                  aria-live="polite"
                  isInline
                />
              </FormAlert>
            )}
            <FormGroup
              label="Name"
              isRequired
              fieldId="text-input-name"
              helperTextInvalid={message}
              validated={fieldState}
              helperText={t("input_filed_invalid_helper_text")}
            >
              <TextInput
                isRequired
                type="text"
                id="text-input-name"
                name="text-input-name"
                value={name}
                onChange={handleTextInputName}
                validated={fieldState}
                autoFocus={true}
              />
            </FormGroup>
          </Form>
        </FlexItem>
        <Divider isVertical />
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--create-instance-modal__sidebar--content"
        >
          <InstanceInfo
            isTrial={true}
            trialDurationInHours={trialDurationInHours}
            onClickQuickStart={onClickQuickStart}
          />
        </FlexItem>
      </Flex>
    </Modal>
  );
};

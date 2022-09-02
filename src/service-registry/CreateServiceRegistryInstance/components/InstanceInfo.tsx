import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import ClockIcon from "@patternfly/react-icons/dist/js/icons/clock-icon";

export type InstanceInfoProps = {
  isTrial: boolean;
  trialDurationInHours: number | undefined;
  onClickQuickStart: () => void;
};

export const InstanceInfo: FunctionComponent<InstanceInfoProps> = ({
  onClickQuickStart,
  isTrial,
  trialDurationInHours,
}) => {
  const { t } = useTranslation("create-service-registry-instance");

  return (
    <Stack hasGutter data-testid={"instance-info"}>
      <StackItem>
        <Card isFlat>
          <CardTitle component="h2">{t("instance_information")}</CardTitle>
          <CardBody>
            <DescriptionList isCompact>
              <DescriptionListGroup>
                <Grid sm={6} lg={12} hasGutter>
                  {!isTrial && (
                    <GridItem data-testid={"instance-duration"}>
                      <DescriptionListTerm>{t("duration")}</DescriptionListTerm>
                      <DescriptionListDescription>
                        <ClockIcon color="var(--pf-global--info-color--100)" />{" "}
                        {t("duration_value", {
                          value: trialDurationInHours,
                        })}
                      </DescriptionListDescription>
                    </GridItem>
                  )}
                  <GridItem>
                    <DescriptionListTerm>
                      {t("artifact_versions")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("artifact_versions_value")}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("artifact_size")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("artifact_size_value")}
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("request_rate")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {t("request_rate_value")}
                    </DescriptionListDescription>
                  </GridItem>
                </Grid>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>
      <StackItem>
        <Card isFlat isCompact>
          <CardTitle component="h2">{t("quick_start_guide_title")}</CardTitle>
          <CardBody>
            <Button
              isSmall
              isInline
              variant={ButtonVariant.link}
              onClick={onClickQuickStart}
            >
              {t("quick_start_guide_message")}
            </Button>
          </CardBody>
        </Card>
      </StackItem>
    </Stack>
  );
};

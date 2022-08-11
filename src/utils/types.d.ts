export interface AWSCredentialProfile {
  profileName: string;
  awsSecretKey: string;
  awsAccessKey: string;
}

export interface AWSConfigProfile {
  profileName: string;
  region: string;
  output: string;
}

export interface AWSProfile extends AWSCredentialProfile, AWSConfigProfile {}

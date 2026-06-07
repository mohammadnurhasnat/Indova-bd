/**
 * Client-side integration services for Google Workspace APIs (Drive, Gmail, and Forms).
 */

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  iconLink?: string;
  webViewLink?: string;
  size?: string;
}

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
}

export interface FormMetadata {
  formId: string;
  title: string;
  description?: string;
  responderUri?: string;
}

export interface FormResponse {
  responseId: string;
  createTime: string;
  answers: Record<string, { questionId: string; textAnswers: { answers: { value: string }[] } }>;
}

/**
 * List files from user's Google Drive.
 */
export async function listDriveFiles(accessToken: string): Promise<DriveFile[]> {
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=15&fields=files(id,name,mimeType,iconLink,webViewLink,size)&orderBy=modifiedTime desc`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Drive list failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Upload a text backup of visa application details to Google Drive.
 */
export async function uploadBackupToDrive(
  accessToken: string,
  fileName: string,
  content: string
): Promise<DriveFile> {
  const metadata = {
    name: fileName,
    mimeType: 'text/plain',
    description: 'Auto-saved Meditrip Visa Assistant application session details.'
  };

  const boundary = 'foo_bar_baz_meditrip';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const body = [
    delimiter,
    'Content-Type: application/json; charset=UTF-8\r\n\r\n',
    JSON.stringify(metadata),
    delimiter,
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n',
    content,
    closeDelimiter
  ].join('');

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to upload application to Drive: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Search Google forms by querying Drive for application/vnd.google-apps.form.
 */
export async function listUserGoogleForms(accessToken: string): Promise<DriveFile[]> {
  const queryParam = encodeURIComponent("mimeType = 'application/vnd.google-apps.form'");
  const url = `https://www.googleapis.com/drive/v3/files?q=${queryParam}&pageSize=15&fields=files(id,name,webViewLink)`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Forms query failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Send an email directly via user's Gmail account.
 */
export async function sendGmailEmail(
  accessToken: string,
  to: string,
  subject: string,
  htmlContent: string
): Promise<any> {
  const emailMessage = [
    'Content-Type: text/html; charset="UTF-8"\r\n',
    'MIME-Version: 1.0\r\n',
    `To: ${to}\r\n`,
    `Subject: ${subject}\r\n\r\n`,
    htmlContent
  ].join('');

  // Base64 encode safely according to Gmail specs
  const raw = btoa(unescape(encodeURIComponent(emailMessage)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch(
    'https://www.googleapis.com/gmail/v1/users/me/messages/send',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw })
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Gmail send failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch Google Form JSON structure mapping.
 */
export async function fetchGoogleFormStructure(accessToken: string, formId: string): Promise<any> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch form info: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch Google Form Responses.
 */
export async function fetchGoogleFormResponses(accessToken: string, formId: string): Promise<any> {
  const url = `https://forms.googleapis.com/v1/forms/${formId}/responses`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch form responses: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new Google Sheet Spreadsheet.
 */
export async function createGoogleSheet(accessToken: string, title: string): Promise<any> {
  const url = 'https://sheets.googleapis.com/v4/spreadsheets';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: title
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to create Google Sheet: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Append row to a Google Sheet.
 */
export async function appendRowToGoogleSheet(
  accessToken: string,
  spreadsheetId: string,
  range: string,
  rowValues: string[]
): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues]
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to append row to Google Sheet: ${response.statusText}`);
  }

  return response.json();
}


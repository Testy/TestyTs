import { expect, Test, XTest, TestSuite } from 'testyts';

@TestSuite()
export class MyTestSuite {

  @Test()
  public async pass1() {

    // Assert
    expect.toBeEqual(1 + 1, 2);
  }
  
  @Test()
  public async fail1() {

    // Assert
    expect.toBeEqual(1 + 1, 3);
  }

  @Test()
  public async fail2() {

    // Assert
    expect.toBeEqual(1 + 1, 3);
  }

  @Test()
  public async fail3() {

    // Assert
    expect.toBeEqual(1 + 1, 3);
  }


  // Validates issue #59 (https://git.io/JLaX3)
  @XTest()
  public async skip1() {

    // Assert
    expect.toBeEqual(1 + 1, 2);
  }

   // Validates issue #59 (https://git.io/JLaX3)
   @XTest()
   public async skip2() {
 
     // Assert
     expect.toBeEqual(1 + 1, 2);
   }
}